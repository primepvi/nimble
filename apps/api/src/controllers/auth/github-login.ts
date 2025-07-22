import type { GithubOAuth2Service } from '@core/services/github-oauth2';
import type { FastifyReply, FastifyRequest } from 'fastify';

export class GithubAuthLoginController {
  public constructor(public authenticator: GithubOAuth2Service) {}

  public async handle(_: FastifyRequest, reply: FastifyReply) {
    const url = await this.authenticator.generateAuthUrl();
    return reply.status(200).send({ url });
  }
}
