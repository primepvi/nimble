import type { PrismaClient } from '@database/generated';
import { PrismaUsersRepository } from '@database/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../create-user';

export function makeCreateUserUseCase(database: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(database);
  const useCase = new CreateUserUseCase(usersRepository);
  return useCase;
}
