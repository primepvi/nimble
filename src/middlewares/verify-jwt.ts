import type { FastifyReply, FastifyRequest } from 'fastify';
import { GenericError } from '@/errors/generic-error';

export async function verifyJwt(request: FastifyRequest, _: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (_error) {
    throw new GenericError(401, 'Unauthorized.');
  }
}
