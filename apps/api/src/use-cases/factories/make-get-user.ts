import { PrismaUsersRepository } from "@database/repositories/prisma/prisma-users-repository";
import { PrismaService } from "@/services";
import { GetUserUseCase } from "../get-user";

export function makeGetUserUseCase() {
  const usersRepository = new PrismaUsersRepository(PrismaService);
  const useCase = new GetUserUseCase(usersRepository);
  return useCase;
}
