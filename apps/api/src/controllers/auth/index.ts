import type { FastifyInstance } from 'fastify';
import { DiscordAuthenticator, GithubAuthenticator } from '@/services';
import { bindHandler } from '@/utils/bind-handler';
import { DiscordAuthCallbackController } from './discord-callback';
import { DiscordAuthLoginController } from './discord-login';
import { GithubAuthCallbackController } from './github-callback';
import { GithubAuthLoginController } from './github-login';

export async function AuthRoutes(app: FastifyInstance) {
  const discordLoginController = new DiscordAuthLoginController(
    DiscordAuthenticator
  );
  const discordCallbackController = new DiscordAuthCallbackController(
    DiscordAuthenticator
  );

  const githubLoginController = new GithubAuthLoginController(
    GithubAuthenticator
  );
  const githubCallbackController = new GithubAuthCallbackController(
    GithubAuthenticator
  );

  // Discord
  app.get('/auth/discord', bindHandler(discordLoginController));
  app.get('/auth/discord/callback', bindHandler(discordCallbackController));

  // Github
  app.get('/auth/github', bindHandler(githubLoginController));
  app.get('/auth/github/callback', bindHandler(githubCallbackController));
}
