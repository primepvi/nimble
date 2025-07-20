import type { Prisma, PrismaClient, User } from "../../generated";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  public constructor(private prisma: PrismaClient) {}

  public async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  public async update(
    id: string,
    data: Prisma.UserUncheckedUpdateInput
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  public async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}
