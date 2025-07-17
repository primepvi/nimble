import type { Connection, ConnectionProvider, Prisma } from '@prisma/client';

export interface ConnectionsRepository {
  findByProviderAndAccountId(
    provider: ConnectionProvider,
    accountId: string
  ): Promise<Connection | null>;

  create(data: Prisma.ConnectionUncheckedCreateInput): Promise<Connection>;
}
