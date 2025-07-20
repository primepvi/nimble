import type { Application, Prisma } from "../generated";

export interface ApplicationsRepository {
  findById(id: number): Promise<Application | null>;
  create(data: Prisma.ApplicationUncheckedCreateInput): Promise<Application>;
}
