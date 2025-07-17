import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { PrismaService } from '@/services';
import { CreateUserUseCase } from '../create-user';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository(PrismaService);
  const useCase = new CreateUserUseCase(usersRepository);
  return useCase;
}
