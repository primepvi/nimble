import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url(),

  // Redis Queue Connection
  DEPLOY_QUEUE_HOST: z.string(),
  DEPLOY_QUEUE_PORT: z.coerce.number(),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  throw new Error(`Invalid env variables. \n${_env.error.message}`);
}

export const env = _env.data;
