import type { Application, Prisma } from '../generated';

export interface ApplicationsRepository {
  findById(id: number): Promise<Application | null>;
  findBySlug(slug: string): Promise<Application | null>;
  fetchPaginatedByUserId(userId: string, page: number): Promise<Application[]>;
  create(data: Prisma.ApplicationUncheckedCreateInput): Promise<Application>;
}
