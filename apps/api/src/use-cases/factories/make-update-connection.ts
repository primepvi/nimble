import { PrismaConnectionsRepository } from '@/repositories/prisma/prisma-connections-repository';
import { PrismaService } from '@/services';
import { UpdateConnectionUseCase } from '../update-connection';

export function makeUpdateConnectionUseCase() {
  const connectionsRepository = new PrismaConnectionsRepository(PrismaService);
  const useCase = new UpdateConnectionUseCase(connectionsRepository);
  return useCase;
}
