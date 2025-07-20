import type { User } from "@database/generated";
import { GenericError } from "@/errors/generic-error";
import type { UsersRepository } from "@database/repositories/users-repository";

export interface CreateUserUseCaseRequest {
  email: string;
}

export interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  public constructor(private usersRepository: UsersRepository) {}
  public async handle({
    email,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const existsUserWithSameEmail = await this.usersRepository.findByEmail(
      email
    );

    if (existsUserWithSameEmail) {
      throw new GenericError(409, "Already exists an user with same email.");
    }

    const user = await this.usersRepository.create({
      email,
    });

    return { user };
  }
}
