import { ConnectionProvider } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { GenericError } from '@/errors/generic-error';
import type { GithubOAuth2Service } from '@/services/github-oauth2';
import { makeCreateConnectionUseCase } from '@/use-cases/factories/make-create-connection';
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user';
import { makeFindConnectionByAccountUseCase } from '@/use-cases/factories/make-find-connection-by-account';
import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user';

const callbackSchema = z.object({
  code: z.string(),
});

export class GithubAuthCallbackController {
  public constructor(private authenticator: GithubOAuth2Service) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { code } = callbackSchema.parse(request.query);
    const payload = await this.authenticator.fetchToken(code);
    const { id, email } = await this.authenticator.fetchUser(
      payload.access_token
    );

    if (!email) {
      throw new GenericError(
        400,
        'This Github account does not have an associated email address.'
      );
    }

    const findConnectionByAccountUseCase = makeFindConnectionByAccountUseCase();
    const { connection } = await findConnectionByAccountUseCase.handle({
      provider: ConnectionProvider.Github,
      providerAccountId: id.toString(),
    });

    if (connection) {
      const getUserUseCase = makeGetUserUseCase();
      const { user } = await getUserUseCase.handle({
        id: connection.userId,
      });

      // TODO: Update tokens and scopes.

      return reply.status(200).send({ user, connection });
    }

    const createUserUseCase = makeCreateUserUseCase();
    const { user: createdUser } = await createUserUseCase.handle({ email });

    // TODO: Encrypt access and refresh tokens before storing them in the database.

    const createConnectionUseCase = makeCreateConnectionUseCase();
    const { connection: createdConnection } =
      await createConnectionUseCase.handle({
        userId: createdUser.id,
        accessToken: payload.access_token,
        provider: ConnectionProvider.Github,
        providerAccountId: id.toString(),
        scope: this.authenticator.config.scopes.join(' '),
      });

    return reply
      .status(201)
      .send({ user: createdUser, connection: createdConnection });
  }
}
