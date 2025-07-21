import { makeGetUserUseCase } from '@core/use-cases/factories/make-get-user';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaService } from '@/services';

export class MeProfileController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const getUserUseCase = makeGetUserUseCase(PrismaService);
    const { user } = await getUserUseCase.handle({ id: request.user.sub });
    return reply.status(200).send(user);
  }
}
