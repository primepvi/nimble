import { logger } from '@kauzx/logger';
import { app } from './app';
import { env } from './env';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => logger.success(`http server running in port: ${env.PORT}.`));
