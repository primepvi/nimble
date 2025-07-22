import type {
  Connection,
  ConnectionProvider,
  Prisma,
  PrismaClient,
} from '../../generated';
import type { ConnectionsRepository } from '../connections-repository';

export class PrismaConnectionsRepository implements ConnectionsRepository {
  public constructor(private prisma: PrismaClient) {}

  public async findByProviderAndAccountId(
    provider: ConnectionProvider,
    accountId: string
  ): Promise<Connection | null> {
    return await this.prisma.connection.findFirst({
      where: {
        providerAccountId: accountId,
        provider,
      },
    });
  }

  public async findByProviderAndUserId(
    provider: ConnectionProvider,
    userId: string
  ): Promise<Connection | null> {
    return await this.prisma.connection.findFirst({
      where: {
        provider,
        userId,
      },
    });
  }

  public async create(
    data: Prisma.ConnectionUncheckedCreateInput
  ): Promise<Connection> {
    return await this.prisma.connection.create({ data });
  }

  public async findById(id: string): Promise<Connection | null> {
    return await this.prisma.connection.findUnique({ where: { id } });
  }

  public async update(
    id: string,
    data: Prisma.ConnectionUncheckedUpdateInput
  ): Promise<Connection> {
    return await this.prisma.connection.update({
      where: {
        id,
      },
      data,
    });
  }
}
