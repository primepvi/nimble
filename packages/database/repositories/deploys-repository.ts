import type { Deploy, Prisma } from '../generated';

export interface DeploysRepository {
  findApplicationActiveDeploy(applicationId: number): Promise<Deploy | null>;
  fetchPaginatedApplicationDeployments(
    applicationId: number,
    page: number
  ): Promise<Deploy[]>;
  findById(id: string): Promise<Deploy | null>;
  create(data: Prisma.DeployUncheckedCreateInput): Promise<Deploy>;
  update(id: string, data: Prisma.DeployUncheckedUpdateInput): Promise<Deploy>;
}
