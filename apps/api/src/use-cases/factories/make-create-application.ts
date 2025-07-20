import {
  PrismaApplicationsRepository,
  PrismaUsersRepository,
} from '@database/repositories/prisma';
import { PrismaService } from '@/services';
import { CreateApplicationUseCase } from '../create-application';

export function makeCreateApplicationUseCase() {
  const applicationsRepository = new PrismaApplicationsRepository(
    PrismaService
  );
  const usersRepository = new PrismaUsersRepository(PrismaService);
  const useCase = new CreateApplicationUseCase(
    applicationsRepository,
    usersRepository
  );

  return useCase;
}
