import type { PrismaClient } from '@database/generated';
import { PrismaApplicationsRepository } from '@database/repositories/prisma';
import { GetApplicationBySlugUseCase } from '../get-application-by-slug';

export function makeGetApplicationBySlugUseCase(database: PrismaClient) {
  const applicationsRepository = new PrismaApplicationsRepository(database);
  const useCase = new GetApplicationBySlugUseCase(applicationsRepository);
  return useCase;
}
