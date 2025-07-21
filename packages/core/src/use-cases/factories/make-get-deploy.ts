import type { PrismaClient } from '@database/generated';
import { PrismaDeploysRepository } from '@database/repositories/prisma';
import { GetDeployUseCase } from '../get-deploy';

export function makeGetDeployUseCase(database: PrismaClient) {
  const deploysRepository = new PrismaDeploysRepository(database);
  const useCase = new GetDeployUseCase(deploysRepository);
  return useCase;
}
