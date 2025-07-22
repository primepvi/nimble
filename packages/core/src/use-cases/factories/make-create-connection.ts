import type { PrismaClient } from '@database/generated';
import { PrismaUsersRepository } from '@database/repositories/prisma';
import { PrismaConnectionsRepository } from '@database/repositories/prisma/prisma-connections-repository';
import { CreateConnectionUseCase } from '../create-connection';

export function makeCreateConnectionUseCase(database: PrismaClient) {
  const connectionsRepository = new PrismaConnectionsRepository(database);
  const usersRepository = new PrismaUsersRepository(database);
  const useCase = new CreateConnectionUseCase(
    connectionsRepository,
    usersRepository
  );

  return useCase;
}
