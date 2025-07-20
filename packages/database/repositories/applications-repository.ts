import type { Application, Prisma } from '../generated';

export interface ApplicationsRepository {
  findById(id: string): Promise<Application | null>;
  findBySlug(slug: string): Promise<Application | null>;
  create(data: Prisma.ApplicationUncheckedCreateInput): Promise<Application>;
}
