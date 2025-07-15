import fastify from 'fastify';
import { ZodError } from 'zod';

export const app = fastify();

app.setErrorHandler((error, _, reply) => {
  if (error instanceof Error) {
    console.error(error.message);
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Missing body properties.',
      errors: error.format()._errors,
    });
  }

  console.error(error);

  return reply.status(500).send({
    message: 'Internal server error.',
  });
});
