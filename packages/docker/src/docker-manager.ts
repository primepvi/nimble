import Docker = require('dockerode');

import fs from 'node:fs';
import path from 'node:path';

import { ApplicationImage } from '../../database/generated';
import type { DockerContainerConfig } from './types';

const DOCKER_IMAGES: Record<ApplicationImage, string> = {
  [ApplicationImage.Node]: 'node:alpine',
};

export class DockerManager {
  private docker: Docker;
  public dataPath: string;

  public constructor(projectRoot: string, socketPath = '/var/run/docker.sock') {
    this.docker = new Docker({ socketPath });
    this.dataPath = path.resolve(projectRoot, '.nimble');
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

  public async pullImage(imageName: string) {
    return new Promise<void>((resolve, reject) => {
      this.docker.pull(
        imageName,
        (pullErr: never, stream: NodeJS.ReadableStream) => {
          if (pullErr) {
            return reject(pullErr);
          }

          this.docker.modem.followProgress(stream, (err) => {
            if (err) {
              return reject(err);
            }

            return resolve();
          });
        }
      );
    });
  }

  public async createContainer(config: DockerContainerConfig) {
    const binds: string[] = [];

    if (config.volumePath) {
      const containerDataPath = path.resolve(
        this.dataPath,
        'containers',
        config.name,
        'data'
      );

      if (!fs.existsSync(containerDataPath)) {
        fs.mkdirSync(containerDataPath, { recursive: true });
      }

      binds.push(`${containerDataPath}:${config.volumePath}`);
    }

    const container = await this.docker.createContainer({
      name: config.name,
      Image: DOCKER_IMAGES[config.image],
      Cmd: config.cmd,
      ExposedPorts: {
        [`${config.containerPort}/tcp`]: {},
      },
      HostConfig: {
        Binds: binds,
        PortBindings: {
          [`${config.containerPort}/tcp`]: [{ HostPort: config.hostPort }],
        },
      },
    });

    return container;
  }
}
