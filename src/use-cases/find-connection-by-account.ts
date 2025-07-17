import type { Connection, ConnectionProvider } from '@prisma/client';
import type { ConnectionsRepository } from '@/repositories/connections-repository';

export interface FindConnectionByAccountUseCaseRequest {
  provider: ConnectionProvider;
  providerAccountId: string;
}

export interface FindConnectionByAccountUseCaseResponse {
  connection: Connection | null;
}

export class FindConnectionByAccountUseCase {
  public constructor(private connectionsRepository: ConnectionsRepository) {}
  public async handle({
    provider,
    providerAccountId,
  }: FindConnectionByAccountUseCaseRequest): Promise<FindConnectionByAccountUseCaseResponse> {
    const connection =
      await this.connectionsRepository.findByProviderAndAccountId(
        provider,
        providerAccountId
      );

    return { connection };
  }
}
