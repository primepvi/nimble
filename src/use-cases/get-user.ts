import type { User } from '@prisma/client';
import { GenericError } from '@/errors/generic-error';
import type { UsersRepository } from '@/repositories/users-repository';

export interface GetUserUseCaseRequest {
  id: string;
}

export interface GetUserUseCaseResponse {
  user: User;
}

export class GetUserUseCase {
  public constructor(private usersRepository: UsersRepository) {}
  public async handle({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new GenericError(404, `Resource "user" not found.`);

    return { user };
  }
}
