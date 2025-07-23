import type { Deploy, Prisma, PrismaClient } from '../../generated';
import type { DeploysRepository } from '../deploys-repository';

const MAX_DEPLOYMENTS_PER_PAGE = 20;

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

  public async fetchPaginatedApplicationDeployments(
    applicationId: number,
    page: number
  ): Promise<Deploy[]> {
    return await this.prisma.deploy.findMany({
      where: {
        applicationId,
      },
      skip: (page - 1) * MAX_DEPLOYMENTS_PER_PAGE,
      take: MAX_DEPLOYMENTS_PER_PAGE,
    });
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
