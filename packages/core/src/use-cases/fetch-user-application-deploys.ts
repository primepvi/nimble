import type { Deploy } from '@database/generated';
import type { ApplicationsRepository } from '@database/repositories/applications-repository';
import type { DeploysRepository } from '@database/repositories/deploys-repository';
import type { UsersRepository } from '@database/repositories/users-repository';
import { GenericError } from '../errors/generic-error';

export interface FetchUserApplicationDeploysUseCaseRequest {
  userId: string;
  applicationSlug: string;
  page: number;
}

export interface FetchUserApplicationDeploysUseCaseResponse {
  deploys: Deploy[];
}

export class FetchUserApplicationDeploysUseCase {
  public constructor(
    private usersRepository: UsersRepository,
    private applicationsRepository: ApplicationsRepository,
    private deploysRepository: DeploysRepository
  ) {}

  public async handle({
    userId,
    applicationSlug,
    page = 1,
  }: FetchUserApplicationDeploysUseCaseRequest): Promise<FetchUserApplicationDeploysUseCaseResponse> {
    page = Math.max(1, page);

    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) {
      throw new GenericError(400, 'Resource "user" not found.');
    }

    const applicationExists =
      await this.applicationsRepository.findBySlug(applicationSlug);
    if (!applicationExists || applicationExists.ownerId !== userId) {
      throw new GenericError(400, 'Resource "app" not found.');
    }

    const deploys =
      await this.deploysRepository.fetchPaginatedApplicationDeployments(
        applicationExists.id,
        page
      );

    return { deploys };
  }
}
