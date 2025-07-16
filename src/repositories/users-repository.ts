import type { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  upsert(data: Prisma.UserUncheckedCreateInput): Promise<User>;
}
