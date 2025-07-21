import { ApplicationImage } from '@database/generated';

const BASE_PORTS: Record<ApplicationImage, number> = {
  [ApplicationImage.Node]: 3000,
};

export function generateAppPort(image: ApplicationImage, id: number) {
  return BASE_PORTS[image] + id;
}
