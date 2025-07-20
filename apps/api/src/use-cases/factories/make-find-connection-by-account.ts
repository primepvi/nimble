import { PrismaConnectionsRepository } from '@/repositories/prisma/prisma-connections-repository';
import { PrismaService } from '@/services';
import { FindConnectionByAccountUseCase } from '../find-connection-by-account';

export function makeFindConnectionByAccountUseCase() {
  const connectionsRepository = new PrismaConnectionsRepository(PrismaService);
  const useCase = new FindConnectionByAccountUseCase(connectionsRepository);
  return useCase;
}
