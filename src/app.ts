import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import fastify from 'fastify';

import { ZodError } from 'zod';
import { AuthRoutes } from './controllers/auth';
import { GenericError } from './errors/generic-error';

export const app = fastify();
app.register(AuthRoutes);

app.setErrorHandler(
  (error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: true,
        statusCode: 400,
        errors: error.format()._errors,
        message: 'Missing body properties.',
      });
    }

    if (error instanceof GenericError) {
      return reply.status(error.httpCode).send({
        error: true,
        statusCode: error.httpCode,
        message: error.message,
      });
    }

    console.error(error);

    return reply.status(500).send({
      error: true,
      statusCode: 500,
      message: 'Internal server error.',
    });
  }
);
