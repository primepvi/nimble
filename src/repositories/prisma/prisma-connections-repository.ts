import type {
  Connection,
  ConnectionProvider,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import type { ConnectionsRepository } from '../connections-repository';

export class PrismaConnectionsRepository implements ConnectionsRepository {
  public constructor(private prisma: PrismaClient) {}

  public async findByProviderAndAccountId(
    provider: ConnectionProvider,
    accountId: string
  ): Promise<Connection | null> {
    return await this.prisma.connection.findUnique({
      where: {
        id: accountId,
        provider,
      },
    });
  }

  public async create(
    data: Prisma.ConnectionUncheckedCreateInput
  ): Promise<Connection> {
    return await this.prisma.connection.create({ data });
  }
}
