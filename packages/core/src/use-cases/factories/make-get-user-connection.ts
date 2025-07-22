import type { PrismaClient } from '@database/generated';
import {
  PrismaConnectionsRepository,
  PrismaUsersRepository,
} from '@database/repositories/prisma';
import { GetUserConnectionUseCase } from '../get-user-connection';

export function makeGetUserConnectionUseCase(database: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(database);
  const connectionsRepository = new PrismaConnectionsRepository(database);
  const useCase = new GetUserConnectionUseCase(
    usersRepository,
    connectionsRepository
  );
  return useCase;
}
