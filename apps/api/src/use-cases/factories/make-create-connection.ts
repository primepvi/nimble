import { PrismaConnectionsRepository } from "@database/repositories/prisma/prisma-connections-repository";
import { PrismaService } from "@/services";
import { CreateConnectionUseCase } from "../create-connection";

export function makeCreateConnectionUseCase() {
  const connectionsRepository = new PrismaConnectionsRepository(PrismaService);
  const useCase = new CreateConnectionUseCase(connectionsRepository);
  return useCase;
}
