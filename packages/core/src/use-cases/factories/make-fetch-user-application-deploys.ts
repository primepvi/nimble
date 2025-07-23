import type { PrismaClient } from '@database/generated';
import {
  PrismaApplicationsRepository,
  PrismaDeploysRepository,
  PrismaUsersRepository,
} from '@database/repositories/prisma';
import { FetchUserApplicationDeploysUseCase } from '../fetch-user-application-deploys';

export function makeFetchUserApplicationDeploysUseCase(database: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(database);
  const applicationsRepository = new PrismaApplicationsRepository(database);
  const deploysRepository = new PrismaDeploysRepository(database);
  const useCase = new FetchUserApplicationDeploysUseCase(
    usersRepository,
    applicationsRepository,
    deploysRepository
  );

  return useCase;
}
