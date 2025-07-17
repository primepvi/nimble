import type { FastifyInstance } from 'fastify';
import { DiscordAuthenticator } from '@/services';
import { bindHandler } from '@/utils/bind-handler';
import { DiscordAuthCallbackController } from './discord-callback';
import { DiscordAuthLoginController } from './discord-login';

export async function AuthRoutes(app: FastifyInstance) {
  const discordLoginController = new DiscordAuthLoginController(
    DiscordAuthenticator
  );
  const discordCallbackController = new DiscordAuthCallbackController(
    DiscordAuthenticator
  );

  app.get('/auth/discord', bindHandler(discordLoginController));
  app.get('/auth/discord/callback', bindHandler(discordCallbackController));
}
