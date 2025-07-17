import type { FastifyReply, FastifyRequest } from 'fastify';

export interface FastifyHandler {
  handle: (request: FastifyRequest, reply: FastifyReply) => Promise<unknown>;
}

export function bindHandler(controller: FastifyHandler) {
  return controller.handle.bind(controller);
}
