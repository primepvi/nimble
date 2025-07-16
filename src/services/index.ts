import { env } from '@/env';
import { DiscordOAuth2Service } from './discord-oauth2';

export const DiscordAuthenticator = new DiscordOAuth2Service({
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.DISCORD_OAUTH2_REDIRECT,
  scopes: ['email', 'identify'],
});
