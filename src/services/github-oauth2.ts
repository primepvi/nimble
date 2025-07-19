import axios from 'axios';

const GITHUB_OAUTH2_URL = 'https://github.com/login/oauth';
const GITHUB_API_URL = 'https://api.github.com';

export interface GithubOAuth2ServiceConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface GithubAccessTokenPayload {
  access_token: string;
  scope: string;
}

export interface GithubUserPayload {
  id: number;
  login: string;
  email: string;
}

export class GithubOAuth2Service {
  public constructor(public config: GithubOAuth2ServiceConfig) {}

  public async generateAuthUrl() {
    const params = new URLSearchParams({
      scope: this.config.scopes.join(' '),
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
    });

    return `${GITHUB_OAUTH2_URL}/authorize?${params.toString()}`;
  }

  public async fetchToken(code: string) {
    const body = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
      code,
    });

    const { data } = await axios.post(
      `${GITHUB_OAUTH2_URL}/access_token`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );

    return data as GithubAccessTokenPayload;
  }

  public async fetchUser(accessToken: string) {
    const { data: user } = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const { data: emails } = await axios.get(`${GITHUB_API_URL}/user/emails`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const email = emails.find((e: { primary: boolean }) => e.primary).email;

    return {
      ...user,
      email,
    } as GithubUserPayload;
  }
}
