import { GenericError } from '@core/errors/generic-error';
import { makeGetApplicationBySlugUseCase } from '@core/use-cases/factories/make-get-application-by-slug';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaService } from '@/services';

const getApplicationParamsSchema = z.object({
  slug: z.string(),
});

export class GetApplicationController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.sub;
    const { slug } = getApplicationParamsSchema.parse(request.params);

    const getApplicationBySlugUseCase =
      makeGetApplicationBySlugUseCase(PrismaService);
    const { application } = await getApplicationBySlugUseCase.handle({
      slug,
    });

    if (application.ownerId !== ownerId) {
      throw new GenericError(400, "Resource 'app' not found.");
    }

    return reply.status(201).send(application);
  }
}
