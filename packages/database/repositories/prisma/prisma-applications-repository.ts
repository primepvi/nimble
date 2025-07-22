import type { Application, Prisma, PrismaClient } from '../../generated';
import type { ApplicationsRepository } from '../applications-repository';

const MAX_APPLICATIONS_PER_PAGE = 20;

export class PrismaApplicationsRepository implements ApplicationsRepository {
  public constructor(private prisma: PrismaClient) {}

  public async findById(id: number): Promise<Application | null> {
    return await this.prisma.application.findUnique({ where: { id } });
  }

  public async findBySlug(slug: string): Promise<Application | null> {
    return await this.prisma.application.findUnique({ where: { slug } });
  }

  public async fetchPaginatedByUserId(
    userId: string,
    page: number
  ): Promise<Application[]> {
    return await this.prisma.application.findMany({
      where: {
        ownerId: userId,
      },
      skip: (page - 1) * MAX_APPLICATIONS_PER_PAGE,
      take: MAX_APPLICATIONS_PER_PAGE,
    });
  }

  public async create(
    data: Prisma.ApplicationUncheckedCreateInput
  ): Promise<Application> {
    return await this.prisma.application.create({
      data,
    });
  }
}
