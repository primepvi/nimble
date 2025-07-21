import type { PrismaClient } from '@database/generated';
import { PrismaUsersRepository } from '@database/repositories/prisma/prisma-users-repository';
import { GetUserUseCase } from '../get-user';

export function makeGetUserUseCase(database: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(database);
  const useCase = new GetUserUseCase(usersRepository);
  return useCase;
}
