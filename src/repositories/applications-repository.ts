import type { Application, Prisma } from '@prisma/client';

export interface ApplicationsRepository {
  findById(id: number): Promise<Application | null>;
  create(data: Prisma.ApplicationUncheckedCreateInput): Promise<Application>;
}
