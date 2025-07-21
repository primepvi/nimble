import type { PrismaClient } from '@database/generated';
import { PrismaConnectionsRepository } from '@database/repositories/prisma/prisma-connections-repository';
import { FindConnectionByAccountUseCase } from '../find-connection-by-account';

export function makeFindConnectionByAccountUseCase(database: PrismaClient) {
  const connectionsRepository = new PrismaConnectionsRepository(database);
  const useCase = new FindConnectionByAccountUseCase(connectionsRepository);
  return useCase;
}
