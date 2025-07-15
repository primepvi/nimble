import z from 'zod';

const envSchema = z.object({
  ENVIRONMENT: z.enum(['dev', 'prod']),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  throw new Error(`Invalid env variables. \n${_env.error.message}`);
}

export const env = _env.data;
