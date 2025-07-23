import { makeFetchUserApplicationDeploysUseCase } from '@core/use-cases';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaService } from '@/services';

const fetchApplicationDeploymentQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

const fetchApplicationDeploymentParamsSchema = z.object({
  slug: z.string(),
});

export class FetchApplicationDeploymentsController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, slug } = {
      ...fetchApplicationDeploymentParamsSchema.parse(request.params),
      ...fetchApplicationDeploymentQuerySchema.parse(request.query),
    };

    const fetchUserApplicationDeploysUseCase =
      makeFetchUserApplicationDeploysUseCase(PrismaService);
    const { deploys } = await fetchUserApplicationDeploysUseCase.handle({
      userId: request.user.sub,
      applicationSlug: slug,
      page,
    });

    return reply.status(200).send({ deploys });
  }
}
