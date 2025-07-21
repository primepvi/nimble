import type { PrismaClient } from '@database/generated';
import {
  PrismaApplicationsRepository,
  PrismaUsersRepository,
} from '@database/repositories/prisma';
import { CreateApplicationUseCase } from '../create-application';

export function makeCreateApplicationUseCase(database: PrismaClient) {
  const applicationsRepository = new PrismaApplicationsRepository(database);
  const usersRepository = new PrismaUsersRepository(database);
  const useCase = new CreateApplicationUseCase(
    applicationsRepository,
    usersRepository
  );

  return useCase;
}
