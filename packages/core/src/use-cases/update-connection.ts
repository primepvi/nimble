import type { Connection } from '@database/generated';
import type { ConnectionsRepository } from '@database/repositories/connections-repository';
import { GenericError } from '../errors/generic-error';

export interface UpdateConnectionUseCaseRequest {
  id: string;
  newConnectionData: Partial<Connection>;
}

export interface UpdateConnectionUseCaseResponse {
  connection: Connection;
}

export class UpdateConnectionUseCase {
  public constructor(private connectionsRepository: ConnectionsRepository) {}

  public async handle({
    id,
    newConnectionData,
  }: UpdateConnectionUseCaseRequest): Promise<UpdateConnectionUseCaseResponse> {
    const existsConnection = await this.connectionsRepository.findById(id);
    if (!existsConnection) {
      throw new GenericError(400, 'Resouce "connection" not found.');
    }

    const updatedConnection = await this.connectionsRepository.update(
      id,
      newConnectionData
    );

    return {
      connection: updatedConnection,
    };
  }
}
