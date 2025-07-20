import Docker = require('dockerode');

import { ApplicationImage } from '../../database/generated';
import type { DockerContainerConfig } from './types';

const DOCKER_IMAGES: Record<ApplicationImage, string> = {
  [ApplicationImage.Node]: 'node:alpine',
};

export class DockerManager {
  private docker: Docker;

  public constructor(socketPath = '/var/run/docker.sock') {
    this.docker = new Docker({ socketPath });
  }

  public async init() {
    const pulledImages = await this.docker.listImages();

    for (const imageName of Object.values(DOCKER_IMAGES)) {
      const alreadyHasPulled = pulledImages.some((pulledImage) =>
        pulledImage.RepoTags?.includes(imageName)
      );

      if (!alreadyHasPulled) {
        await this.pullImage(imageName);
      }
    }
  }

  private async pullImage(imageName: string) {
    return new Promise<void>((resolve, reject) => {
      this.docker.pull(imageName, (pullErr: never, stream) => {
        if (pullErr) {
          return reject(pullErr);
        }

        this.docker.modem.followProgress(stream, (err: never) => {
          if (err) {
            return reject(err);
          }

          return resolve();
        });
      });
    });
  }

  public async createContainer(config: DockerContainerConfig) {
    const container = await this.docker.createContainer({
      name: config.name,
      Image: DOCKER_IMAGES[config.image],
      Cmd: config.cmd,
      ExposedPorts: {
        [`${config.containerPort}/tcp`]: {},
      },
      HostConfig: {
        PortBindings: {
          [`${config.containerPort}/tcp`]: [{ HostPort: config.hostPort }],
        },
      },
    });

    return container;
  }
}
