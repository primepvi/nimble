import type { Application } from '@database/generated';
import type { ApplicationsRepository } from '@database/repositories/applications-repository';
import { GenericError } from '../errors/generic-error';

export interface GetApplicationBySlugUseCaseRequest {
  slug: string;
}

export interface GetApplicationBySlugUseCaseResponse {
  application: Application;
}

export class GetApplicationBySlugUseCase {
  public constructor(private applicationsRepository: ApplicationsRepository) {}

  public async handle({
    slug,
  }: GetApplicationBySlugUseCaseRequest): Promise<GetApplicationBySlugUseCaseResponse> {
    const application = await this.applicationsRepository.findBySlug(slug);

    if (!application) {
      throw new GenericError(400, "Resource 'app' not found.");
    }

    return { application };
  }
}
