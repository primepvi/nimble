import { GenericError } from '@core/errors/generic-error';
import type { GithubOAuth2Service } from '@core/services/github-oauth2';
import { makeGetUserConnectionUseCase } from '@core/use-cases';
import { makeCreateApplicationUseCase } from '@core/use-cases/factories/make-create-application';
import { ApplicationImage, ConnectionProvider } from '@database/generated';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaService } from '@/services';

const createApplicationBodySchema = z.object({
  image: z.enum(ApplicationImage),
  name: z.string(),
  slug: z.string(),
  repository: z.string(),
  ram: z.int(),
  cpu: z.float32(),
});

export class CreateApplicationController {
  public constructor(private github: GithubOAuth2Service) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.sub;
    const parsedBody = createApplicationBodySchema.parse(request.body);

    const getUserConnectionUseCase =
      makeGetUserConnectionUseCase(PrismaService);
    const { connection } = await getUserConnectionUseCase.handle({
      userId: ownerId,
      provider: ConnectionProvider.Github,
    });

    const userRepositories = await this.github.fetchRepositories(
      connection.accessToken
    );

    const isValidRepositoryURL = userRepositories.some((repo) => {
      return repo.full_name === parsedBody.repository;
    });

    if (!isValidRepositoryURL) {
      throw new GenericError(400, 'Invalid repository has provided.');
    }

    const createApplicationUseCase =
      makeCreateApplicationUseCase(PrismaService);
    const { application } = await createApplicationUseCase.handle({
      ...parsedBody,
      ownerId,
    });

    return reply.status(201).send(application);
  }
}
