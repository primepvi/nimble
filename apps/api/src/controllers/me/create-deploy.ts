import { GenericError } from '@core/errors/generic-error';
import {
  makeCreateDeployUseCase,
  makeGetApplicationBySlugUseCase,
} from '@core/use-cases';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { DeployQueueService, PrismaService } from '@/services';

const createDeployParamsSchema = z.object({
  slug: z.string(),
});

export class CreateDeployController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.sub;
    const { slug } = createDeployParamsSchema.parse(request.params);

    const getApplicationBySlugUseCase =
      makeGetApplicationBySlugUseCase(PrismaService);
    const { application } = await getApplicationBySlugUseCase.handle({
      slug,
    });

    if (application.ownerId !== ownerId) {
      throw new GenericError(400, "Resource 'app' not found.");
    }

    const createDeployUseCase = makeCreateDeployUseCase(PrismaService);
    const { deploy } = await createDeployUseCase.handle({
      applicationSlug: slug,
    });

    await DeployQueueService.enqueue({
      applicationSlug: slug,
      deployId: deploy.id,
    });

    return reply.status(200).send(deploy);
  }
}
