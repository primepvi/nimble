import z from 'zod';

const envSchema = z.object({
  ENVIRONMENT: z.enum(['dev', 'prod']),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),

  // Database
  DATABASE_URL: z.url(),

  // DISCORD
  DISCORD_OAUTH2_REDIRECT: z.url(),
  DISCORD_CLIENT_SECRET: z.string(),
  DISCORD_CLIENT_ID: z.string(),

  // GITHUB
  GITHUB_OAUTH2_REDIRECT: z.url(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  throw new Error(`Invalid env variables. \n${_env.error.message}`);
}

export const env = _env.data;
