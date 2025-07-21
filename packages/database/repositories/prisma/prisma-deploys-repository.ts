import type { Deploy, Prisma, PrismaClient } from '../../generated';
import type { DeploysRepository } from '../deploys-repository';

export class PrismaDeploysRepository implements DeploysRepository {
  public constructor(private prisma: PrismaClient) {}

  public async findApplicationActiveDeploy(
    applicationId: string
  ): Promise<Deploy | null> {
    return await this.prisma.deploy.findFirst({
      where: {
        applicationId,
        status: { in: ['PENDING', 'RUNNING'] },
      },
    });
  }

  public async create(
    data: Prisma.DeployUncheckedCreateInput
  ): Promise<Deploy> {
    return await this.prisma.deploy.create({ data });
  }
}
