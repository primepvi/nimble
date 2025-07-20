import { DockerManager } from './docker-manager';

export const DockerService = new DockerManager();
DockerService.init();
