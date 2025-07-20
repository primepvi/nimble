import { type Job, Queue, Worker } from 'bullmq';
import type { QueueConnection } from '@/types';

export interface DeployQueuePayload {
  applicationSlug: string;
}

export type DeployQueueProcessRunner = (
  job: Job<DeployQueuePayload>
) => Promise<void>;

export class DeployQueue {
  public queue: Queue;

  public constructor(public connection: QueueConnection) {
    this.queue = new Queue('deploy', { connection });
  }

  public async enqueue(payload: DeployQueuePayload) {
    await this.queue.add('deploy-job', payload, {
      attempts: 3,
    });
  }

  public createWorker(runner: DeployQueueProcessRunner) {
    const worker = new Worker('deploy', runner, {
      connection: this.connection,
    });

    return worker;
  }
}
