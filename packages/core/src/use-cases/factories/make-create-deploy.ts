import type { PrismaClient } from '@database/generated';
import {
  PrismaApplicationsRepository,
  PrismaDeploysRepository,
} from '@database/repositories/prisma';
import { CreateDeployUseCase } from '../create-deploy';

export function makeCreateDeployUseCase(database: PrismaClient) {
  const deploysRepository = new PrismaDeploysRepository(database);
  const applicationsRepository = new PrismaApplicationsRepository(database);
  const useCase = new CreateDeployUseCase(
    deploysRepository,
    applicationsRepository
  );
  return useCase;
}
