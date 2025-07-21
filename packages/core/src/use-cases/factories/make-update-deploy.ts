import type { PrismaClient } from '@database/generated';
import { PrismaDeploysRepository } from '@database/repositories/prisma';
import { UpdateDeployUseCase } from '../update-deploy';

export function makeUpdateDeployUseCase(database: PrismaClient) {
  const deploysRepository = new PrismaDeploysRepository(database);
  const useCase = new UpdateDeployUseCase(deploysRepository);
  return useCase;
}
