import { PrismaApplicationsRepository } from '@database/repositories/prisma';
import { PrismaService } from '@/services';
import { GetApplicationBySlugUseCase } from '../get-application-by-slug';

export function makeGetApplicationBySlugUseCase() {
  const applicationsRepository = new PrismaApplicationsRepository(
    PrismaService
  );
  const useCase = new GetApplicationBySlugUseCase(applicationsRepository);
  return useCase;
}
