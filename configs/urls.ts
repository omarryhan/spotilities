import { SPOTIFY_CLIENT_ID, SPOTIFY_SCOPES_NEEDED } from './services';

// const BASE_API_LINK = 'https://api.spotify.com';

export const PRODUCTION_URL = 'https://spotilities.vercel.app';

export const DEVELOPMENT_URL = 'http://localhost:3000';

export const getCurrentBaseUrl = (): string => (process.env.NODE_ENV === 'development' ? DEVELOPMENT_URL : PRODUCTION_URL);

const BASE_ACCOUNTS_LINK = 'https://accounts.spotify.com';

export const AUTHORIZE_LINK = `${BASE_ACCOUNTS_LINK}/authorize`;

export const OAUTH2_REDIRECT_URI = `${getCurrentBaseUrl()}/auth/redirect`;

export const createAuthorizeLink = (): string => {
  const encodedRedirectURI = encodeURI(OAUTH2_REDIRECT_URI);
  const scopes = encodeURI(SPOTIFY_SCOPES_NEEDED.join(' '));
  return `${AUTHORIZE_LINK}?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodedRedirectURI}&scope=${scopes}&show_dialog=false`;
};
