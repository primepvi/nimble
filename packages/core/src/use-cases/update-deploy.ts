import type { Deploy } from '@database/generated';
import type { DeploysRepository } from '@database/repositories/deploys-repository';
import { GenericError } from '../errors/generic-error';

export interface UpdateDeployUseCaseRequest {
  id: string;
  newDeployData: Partial<Deploy>;
}

export interface UpdateDeployUseCaseResponse {
  deploy: Deploy;
}

export class UpdateDeployUseCase {
  public constructor(private deploysRepository: DeploysRepository) {}

  public async handle({
    id,
    newDeployData,
  }: UpdateDeployUseCaseRequest): Promise<UpdateDeployUseCaseResponse> {
    const existsDeploy = await this.deploysRepository.findById(id);
    if (!existsDeploy) {
      throw new GenericError(400, `Resource 'deploy' not found.`);
    }

    const deploy = await this.deploysRepository.update(id, newDeployData);

    return { deploy };
  }
}
