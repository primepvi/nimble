import type { FastifyInstance } from 'fastify';
import { DiscordAuthenticator } from '@/services';
import { DiscordAuthCallbackController } from './callback';
import { DiscordAuthLoginController } from './login';

export async function DiscordRoutes(app: FastifyInstance) {
  const loginController = new DiscordAuthLoginController(DiscordAuthenticator);
  const callbackController = new DiscordAuthCallbackController(
    DiscordAuthenticator
  );

  app.get('/discord/login', loginController.handle.bind(loginController));
  app.get(
    '/discord/callback',
    callbackController.handle.bind(callbackController)
  );
}
