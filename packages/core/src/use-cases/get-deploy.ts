import type { Deploy } from '@database/generated';
import type { DeploysRepository } from '@database/repositories/deploys-repository';
import { GenericError } from '../errors/generic-error';

export interface GetDeployUseCaseRequest {
  id: string;
}

export interface GetDeployUseCaseResponse {
  deploy: Deploy;
}

export class GetDeployUseCase {
  public constructor(private deploysRepository: DeploysRepository) {}
  public async handle({
    id,
  }: GetDeployUseCaseRequest): Promise<GetDeployUseCaseResponse> {
    const deploy = await this.deploysRepository.findById(id);
    if (!deploy) {
      throw new GenericError(404, `Resource "deploy" not found.`);
    }

    return { deploy };
  }
}
