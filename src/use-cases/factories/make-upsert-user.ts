import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { PrismaService } from '@/services';
import { UpsertUserUseCase } from '../upsert-user';

export function makeUpsertUserUseCase() {
  const usersRepository = new PrismaUsersRepository(PrismaService);
  const useCase = new UpsertUserUseCase(usersRepository);
  return useCase;
}
