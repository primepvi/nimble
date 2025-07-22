import type { Connection, ConnectionProvider, Prisma } from '../generated';

export interface ConnectionsRepository {
  findById(id: string): Promise<Connection | null>;

  findByProviderAndAccountId(
    provider: ConnectionProvider,
    accountId: string
  ): Promise<Connection | null>;

  findByProviderAndUserId(
    provider: ConnectionProvider,
    userId: string
  ): Promise<Connection | null>;

  create(data: Prisma.ConnectionUncheckedCreateInput): Promise<Connection>;

  update(
    id: string,
    data: Prisma.ConnectionUncheckedUpdateInput
  ): Promise<Connection>;
}
