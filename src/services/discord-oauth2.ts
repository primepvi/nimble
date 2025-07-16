import OAuth from 'discord-oauth2';

export interface DiscordOAuth2ServiceConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export class DiscordOAuth2Service {
  private authenticator: OAuth;

  public constructor(private config: DiscordOAuth2ServiceConfig) {
    this.authenticator = new OAuth(config);
  }

  public async generateAuthUrl() {
    return this.authenticator.generateAuthUrl({
      scope: this.config.scopes,
      clientId: this.config.clientId,
      redirectUri: this.config.redirectUri,
    });
  }

  public async getUserAndTokenPayload(code: string) {
    const payload = await this.authenticator.tokenRequest({
      grantType: 'authorization_code',
      scope: this.config.scopes,
      code,
    });

    const user = await this.authenticator.getUser(payload.access_token);

    return { user, payload };
  }
}
