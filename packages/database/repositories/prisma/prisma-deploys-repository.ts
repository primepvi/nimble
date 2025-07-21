import type { Deploy, Prisma, PrismaClient } from '../../generated';
import type { DeploysRepository } from '../deploys-repository';

export class PrismaDeploysRepository implements DeploysRepository {
  public constructor(private prisma: PrismaClient) {}

  public async findApplicationActiveDeploy(
    applicationId: number
  ): Promise<Deploy | null> {
    return await this.prisma.deploy.findFirst({
      where: {
        applicationId,
        status: { in: ['PENDING', 'RUNNING'] },
      },
    });
  }

  public async findById(id: string): Promise<Deploy | null> {
    return await this.prisma.deploy.findUnique({ where: { id } });
  }

  public async create(
    data: Prisma.DeployUncheckedCreateInput
  ): Promise<Deploy> {
    return await this.prisma.deploy.create({ data });
  }

  public async update(
    id: string,
    data: Prisma.DeployUncheckedUpdateInput
  ): Promise<Deploy> {
    return await this.prisma.deploy.update({
      where: { id },
      data,
    });
  }
}
