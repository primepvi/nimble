import { makeFetchUserApplicationsUseCase } from '@core/use-cases';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaService } from '@/services';

export const fetchApplicationsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export class FetchApplicationsController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page } = fetchApplicationsQuerySchema.parse(request.query);
    const userId = request.user.sub;

    console.log(page);

    const fetchUserApplicationsUseCase =
      makeFetchUserApplicationsUseCase(PrismaService);
    const { applications } = await fetchUserApplicationsUseCase.handle({
      userId,
      page,
    });

    return reply.status(200).send({ applications });
  }
}
