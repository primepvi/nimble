import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import type { DiscordOAuth2Service } from '../../services/discord-oauth2';

const callbackSchema = z.object({
  code: z.string(),
});

export class DiscordAuthCallbackController {
  public constructor(private authenticator: DiscordOAuth2Service) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { code } = callbackSchema.parse(request.query);
    const payload = await this.authenticator.getUserAndTokenPayload(code);

    console.log(payload);

    return reply.status(201);
  }
}
