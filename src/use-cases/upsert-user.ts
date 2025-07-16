import type { User } from '@prisma/client';
import type { UsersRepository } from '@/repositories/users-repository';

export interface UpsertUserUseCaseRequest {
  id: string;
  email: string;
  refreshToken: string;
}
export interface UpsertUserUseCaseResponse {
  user: User;
}

export class UpsertUserUseCase {
  public constructor(private usersRepository: UsersRepository) {}

  public async handle({
    id,
    email,
    refreshToken,
  }: UpsertUserUseCaseRequest): Promise<UpsertUserUseCaseResponse> {
    const user = await this.usersRepository.upsert({
      id,
      email,
      refreshToken,
    });

    return { user };
  }
}
