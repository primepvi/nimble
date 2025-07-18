import type { Connection, ConnectionProvider } from '@prisma/client';
import { GenericError } from '@/errors/generic-error';
import type { ConnectionsRepository } from '@/repositories/connections-repository';

export interface CreateConnectionUseCaseRequest {
  userId: string;
  provider: ConnectionProvider;
  providerAccountId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  scope?: string;
}

export interface CreateConnectionUseCaseResponse {
  connection: Connection;
}

export class CreateConnectionUseCase {
  public constructor(private connectionsRepository: ConnectionsRepository) {}
  public async handle(
    data: CreateConnectionUseCaseRequest
  ): Promise<CreateConnectionUseCaseResponse> {
    const existsConnectionWithSameAccount =
      await this.connectionsRepository.findByProviderAndAccountId(
        data.provider,
        data.providerAccountId
      );

    if (existsConnectionWithSameAccount) {
      throw new GenericError(
        409,
        'A connection with this provider account already exists.'
      );
    }

    const connection = await this.connectionsRepository.create(data);

    return { connection };
  }
}
