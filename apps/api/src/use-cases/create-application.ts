import type { Application, ApplicationImage } from "@database/generated";
import { GenericError } from "@/errors/generic-error";
import type { ApplicationsRepository } from "@database/repositories/applications-repository";
import type { UsersRepository } from "@database/repositories/users-repository";

export interface CreateApplicationUseCaseRequest {
  ownerId: string;
  image: ApplicationImage;
  slug: string;
  repository: string;
  ram: number;
  cpu: number;
}

export interface CreateApplicationUseCaseResponse {
  application: Application;
}

export class CreateApplicationUseCase {
  public constructor(
    private applicationsRepository: ApplicationsRepository,
    private usersRepository: UsersRepository
  ) {}

  public async handle(
    applicationData: CreateApplicationUseCaseRequest
  ): Promise<CreateApplicationUseCaseResponse> {
    const existsOwnerUser = await this.usersRepository.findById(
      applicationData.ownerId
    );

    if (!existsOwnerUser) {
      throw new GenericError(400, "Owner user not found.");
    }

    const application = await this.applicationsRepository.create(
      applicationData
    );

    return { application };
  }
}
