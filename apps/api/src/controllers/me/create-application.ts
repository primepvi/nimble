import { makeCreateApplicationUseCase } from '@core/use-cases/factories/make-create-application';
import { ApplicationImage } from '@database/generated';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaService } from '@/services';

const createApplicationBodySchema = z.object({
  image: z.enum(ApplicationImage),
  name: z.string(),
  slug: z.string(),
  repository: z.url(),
  ram: z.int(),
  cpu: z.float32(),
});

export class CreateApplicationController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.sub;
    const parsedBody = createApplicationBodySchema.parse(request.body);

    // TODO: validate if is a valid github repository

    const createApplicationUseCase =
      makeCreateApplicationUseCase(PrismaService);
    const { application } = await createApplicationUseCase.handle({
      ...parsedBody,
      ownerId,
    });

    return reply.status(201).send(application);
  }
}
