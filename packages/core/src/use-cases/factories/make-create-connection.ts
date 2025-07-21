import type { PrismaClient } from '@database/generated';
import { PrismaConnectionsRepository } from '@database/repositories/prisma/prisma-connections-repository';
import { CreateConnectionUseCase } from '../create-connection';

export function makeCreateConnectionUseCase(database: PrismaClient) {
  const connectionsRepository = new PrismaConnectionsRepository(database);
  const useCase = new CreateConnectionUseCase(connectionsRepository);
  return useCase;
}
