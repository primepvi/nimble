import { GenericError } from '@core/errors/generic-error';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(request: FastifyRequest, _: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (_error) {
    throw new GenericError(401, 'Unauthorized.');
  }
}
