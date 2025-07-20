import type { User } from '@database/generated';
import type { UsersRepository } from '@database/repositories/users-repository';
import { GenericError } from '@/errors/generic-error';

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
    if (!user) {
      throw new GenericError(404, `Resource "user" not found.`);
    }

    return { user };
  }
}
