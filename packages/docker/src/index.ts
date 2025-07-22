import path from 'node:path';
import { DockerManager } from './docker-manager';

const projectRootPath = path.resolve(__dirname, '../../../');
export const DockerService = new DockerManager(projectRootPath);
DockerService.init();
