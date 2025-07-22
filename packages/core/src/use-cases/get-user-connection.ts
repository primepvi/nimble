import type { Connection, ConnectionProvider } from '@database/generated';
import type { ConnectionsRepository } from '@database/repositories/connections-repository';
import type { UsersRepository } from '@database/repositories/users-repository';
import { GenericError } from '../errors/generic-error';

export interface GetUserConnectionUseCaseRequest {
  userId: string;
  provider: ConnectionProvider;
}

export interface GetUserConnectionUseCaseResponse {
  connection: Connection;
}

export class GetUserConnectionUseCase {
  public constructor(
    private usersRepository: UsersRepository,
    private connectionsRepository: ConnectionsRepository
  ) {}

  public async handle({
    userId,
    provider,
  }: GetUserConnectionUseCaseRequest): Promise<GetUserConnectionUseCaseResponse> {
    const existsUser = await this.usersRepository.findById(userId);
    if (!existsUser) {
      throw new GenericError(400, 'Resource "user" not found.');
    }

    const connection = await this.connectionsRepository.findByProviderAndUserId(
      provider,
      userId
    );
    if (!connection) {
      throw new GenericError(
        400,
        `User does not have a connection with provider "${provider}".`
      );
    }

    return { connection };
  }
}
