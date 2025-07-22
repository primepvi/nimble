import {
  makeGetApplicationBySlugUseCase,
  makeGetDeployUseCase,
  makeUpdateDeployUseCase,
} from '@core/use-cases';
import { DockerService } from '@docker';
import { DeployQueue } from '@queue';
import { env } from './env';
import { prisma } from './prisma';

const queue = new DeployQueue({
  host: env.DEPLOY_QUEUE_HOST,
  port: env.DEPLOY_QUEUE_PORT,
});

export const worker = queue.createWorker(async (job) => {
  const { applicationSlug, deployId } = job.data;

  const updateDeployUseCase = makeUpdateDeployUseCase(prisma);

  try {
    await updateDeployUseCase.handle({
      id: deployId,
      newDeployData: {
        startedAt: new Date(),
        status: 'RUNNING',
      },
    });

    const getApplicationBySlugUseCase = makeGetApplicationBySlugUseCase(prisma);
    const { application } = await getApplicationBySlugUseCase.handle({
      slug: applicationSlug,
    });

    const getDeployUseCase = makeGetDeployUseCase(prisma);
    const { deploy } = await getDeployUseCase.handle({ id: deployId });

    if (!(application && deploy)) {
      throw new Error('Found an invalid deployment.');
    }

    const container = await DockerService.createContainer({
      image: application.image,
      containerPort: String(3000),
      hostPort: String(deploy.port),
      cmd: ['node', '-e', 'console.log("Hello from container")'],
      name: `nimble-container-${application.slug}`,
      volumePath: '/app/data',
    });

    await container.start();

    await updateDeployUseCase.handle({
      id: deployId,
      newDeployData: {
        finishedAt: new Date(),
        status: 'SUCCESS',
        containedId: container.id,
      },
    });
  } catch (err) {
    await updateDeployUseCase.handle({
      id: deployId,
      newDeployData: {
        finishedAt: new Date(),
        status: 'FAILED',
        logs: (err as Error).message,
      },
    });
  }
});
