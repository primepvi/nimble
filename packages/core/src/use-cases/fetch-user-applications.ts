import type { Application } from '@database/generated';
import type { ApplicationsRepository } from '@database/repositories/applications-repository';
import type { UsersRepository } from '@database/repositories/users-repository';
import { GenericError } from '../errors/generic-error';

export interface FetchUserApplicationsUseCaseRequest {
  userId: string;
  page: number;
}

export interface FetchUserApplicationsUseCaseResponse {
  applications: Application[];
}

export class FetchUserApplicationsUseCase {
  public constructor(
    private usersRepository: UsersRepository,
    private applicationsRepository: ApplicationsRepository
  ) {}

  public async handle({
    userId,
    page = 1,
  }: FetchUserApplicationsUseCaseRequest): Promise<FetchUserApplicationsUseCaseResponse> {
    page = Math.max(1, page);

    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) {
      throw new GenericError(400, 'Resource "user" not found.');
    }

    const applications =
      await this.applicationsRepository.fetchPaginatedByUserId(userId, page);

    return { applications };
  }
}
