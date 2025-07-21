import { DeployQueue } from '@queue';
import { env } from './env';

const queue = new DeployQueue({
  host: env.DEPLOY_QUEUE_HOST,
  port: env.DEPLOY_QUEUE_PORT,
});

export const worker = queue.createWorker(async (_) => {
  return;
});
