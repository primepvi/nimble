import type { Prisma, PrismaClient } from '@prisma/client';

export class PrismaUsersRepository {
  public constructor(private prisma: PrismaClient) {}

  public async upsert(data: Prisma.UserUncheckedCreateInput) {
    const user = await this.prisma.user.upsert({
      where: {
        id: data.id,
      },
      create: data,
      update: {
        email: data.email,
        refreshToken: data.refreshToken,
      },
    });

    return user;
  }
}
