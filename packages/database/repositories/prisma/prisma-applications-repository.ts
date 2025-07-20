import type { Application, Prisma, PrismaClient } from "../../generated";
import type { ApplicationsRepository } from "../applications-repository";

export class PrismaApplicationsRepository implements ApplicationsRepository {
  public constructor(private prisma: PrismaClient) {}

  public async findById(id: number): Promise<Application | null> {
    return await this.prisma.application.findUnique({ where: { id } });
  }

  public async create(
    data: Prisma.ApplicationUncheckedCreateInput
  ): Promise<Application> {
    return await this.prisma.application.create({
      data,
    });
  }
}
