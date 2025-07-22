import type { PrismaClient } from '@database/generated';
import {
  PrismaApplicationsRepository,
  PrismaUsersRepository,
} from '@database/repositories/prisma';
import { FetchUserApplicationsUseCase } from '../fetch-user-applications';

export function makeFetchUserApplicationsUseCase(database: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(database);
  const applicationsRepository = new PrismaApplicationsRepository(database);
  const useCase = new FetchUserApplicationsUseCase(
    usersRepository,
    applicationsRepository
  );

  return useCase;
}
