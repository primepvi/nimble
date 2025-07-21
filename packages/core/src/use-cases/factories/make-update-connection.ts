import type { PrismaClient } from '@database/generated';
import { PrismaConnectionsRepository } from '@database/repositories/prisma/prisma-connections-repository';
import { UpdateConnectionUseCase } from '../update-connection';

export function makeUpdateConnectionUseCase(database: PrismaClient) {
  const connectionsRepository = new PrismaConnectionsRepository(database);
  const useCase = new UpdateConnectionUseCase(connectionsRepository);
  return useCase;
}
