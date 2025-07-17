import axios from 'axios';

const DISCORD_API_URL = 'https://discord.com/api';

export interface DiscordOAuth2ServiceConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface DiscordAccessTokenPayload {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface DiscordUserPayload {
  id: string;
  username: string;
  email?: string;
}

export class DiscordOAuth2Service {
  public constructor(public config: DiscordOAuth2ServiceConfig) {}

  public async generateAuthUrl() {
    const params = new URLSearchParams({
      scope: this.config.scopes.join(' '),
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
    });

    return `${DISCORD_API_URL}/oauth2/authorize?${params.toString()}`;
  }

  public async fetchToken(code: string) {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
      code,
    });

    const { data } = await axios.post(`${DISCORD_API_URL}/oauth2/token`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data as DiscordAccessTokenPayload;
  }

  public async fetchUser(accessToken: string) {
    const { data } = await axios.get(`${DISCORD_API_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data as DiscordUserPayload;
  }
}
