import type { DiscordOAuth2Service } from '@core/services/discord-oauth2';
import type { FastifyReply, FastifyRequest } from 'fastify';

export class DiscordAuthLoginController {
  public constructor(public authenticator: DiscordOAuth2Service) {}

  public async handle(_: FastifyRequest, reply: FastifyReply) {
    const url = await this.authenticator.generateAuthUrl();
    return reply.status(200).send({ url });
  }
}
