import type { Deploy } from '@database/generated';
import type { ApplicationsRepository } from '@database/repositories/applications-repository';
import type { DeploysRepository } from '@database/repositories/deploys-repository';
import { GenericError } from '../errors/generic-error';
import { generateAppPort } from '../utils/generate-app-port';

export interface CreateDeployUseCaseRequest {
  applicationSlug: string;
}

export interface CreateDeployUseCaseResponse {
  deploy: Deploy;
}

export class CreateDeployUseCase {
  public constructor(
    private deploysRepository: DeploysRepository,
    private applicationsRepository: ApplicationsRepository
  ) {}

  public async handle({
    applicationSlug,
  }: CreateDeployUseCaseRequest): Promise<CreateDeployUseCaseResponse> {
    const application =
      await this.applicationsRepository.findBySlug(applicationSlug);
    if (!application) {
      throw new GenericError(400, `Resource 'app' not found.`);
    }

    const applicationActiveDeploy =
      await this.deploysRepository.findApplicationActiveDeploy(application.id);
    if (applicationActiveDeploy) {
      throw new GenericError(
        409,
        'Already exists an active deploy for this application.'
      );
    }

    const deploy = await this.deploysRepository.create({
      applicationId: application.id,
      port: generateAppPort(application.image, application.id),
    });

    return { deploy };
  }
}
