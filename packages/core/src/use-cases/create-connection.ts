import type { Connection, ConnectionProvider } from '@database/generated';
import type { ConnectionsRepository } from '@database/repositories/connections-repository';
import type { UsersRepository } from '@database/repositories/users-repository';
import { GenericError } from '../errors/generic-error';

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
  public constructor(
    private connectionsRepository: ConnectionsRepository,
    private usersRepository: UsersRepository
  ) {}
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

    const ownerExists = await this.usersRepository.findById(data.userId);
    if (!ownerExists) {
      throw new GenericError(400, 'Resource "user" not found.');
    }

    const connection = await this.connectionsRepository.create(data);

    return { connection };
  }
}
