import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user';

export class MeProfileController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const getUserUseCase = makeGetUserUseCase();
    const { user } = await getUserUseCase.handle({ id: request.user.sub });
    return reply.status(200).send(user);
  }
}
