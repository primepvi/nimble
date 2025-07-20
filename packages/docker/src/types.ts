import type { ApplicationImage } from '../../database/generated';

export interface DockerContainerConfig {
  image: ApplicationImage;
  name: string;
  cmd: string[];
  containerPort: string;
  hostPort: string;
}
