import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { makeUpsertUserUseCase } from '@/use-cases/factories/make-upsert-user';
import type { DiscordOAuth2Service } from '../../services/discord-oauth2';

const callbackSchema = z.object({
  code: z.string(),
});

export class DiscordAuthCallbackController {
  public constructor(private authenticator: DiscordOAuth2Service) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { code } = callbackSchema.parse(request.query);
    const { user: discordUser, payload } =
      await this.authenticator.getUserAndTokenPayload(code);
    const { id, email } = discordUser;

    if (!email) {
      return reply
        .status(400)
        .send({ error: true, message: 'Invalid email has provided.' });
    }

    const upsertUseCase = makeUpsertUserUseCase();
    const { user } = await upsertUseCase.handle({
      id,
      email,
      refreshToken: payload.refresh_token,
    });

    return reply.status(201).send(user);
  }
}
