import { PrismaClient } from '@prisma/client';
import { env } from '@/env';
import { DiscordOAuth2Service } from './discord-oauth2';
import { GithubOAuth2Service } from './github-oauth2';

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
