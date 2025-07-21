import type { Deploy, Prisma } from '../generated';

export interface DeploysRepository {
  findApplicationActiveDeploy(applicationId: string): Promise<Deploy | null>;
  create(data: Prisma.DeployUncheckedCreateInput): Promise<Deploy>;
}
