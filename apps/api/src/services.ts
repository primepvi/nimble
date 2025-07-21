import { DiscordOAuth2Service } from '@core/services/discord-oauth2';
import { GithubOAuth2Service } from '@core/services/github-oauth2';
import { PrismaClient } from '@database/generated';
import { DeployQueue } from '@queue';
import { env } from './env';

export const DiscordAuthenticator = new DiscordOAuth2Service({
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.DISCORD_OAUTH2_REDIRECT,
  scopes: ['email', 'identify'],
});

export const GithubAuthenticator = new GithubOAuth2Service({
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
  redirectUri: env.GITHUB_OAUTH2_REDIRECT,
  scopes: ['read:user', 'user:email', 'repo'],
});

export const PrismaService = new PrismaClient({
  log: ['error', 'query'],
});

export const DeployQueueService = new DeployQueue({
  host: env.DEPLOY_QUEUE_HOST,
  port: env.DEPLOY_QUEUE_PORT,
});
