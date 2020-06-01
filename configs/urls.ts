import request, { Request } from 'superagent';

const BASE_API_LINK = 'https://api.spotify.com';

const PRODUCTION_URL = 'https://spotilities.netlify.app';

const DEVELOPMENT_URL = 'http://localhost:3000';

const BASE_ACCOUNTS_LINK = 'https://accounts.spotify.com';

export const getUserProfile = (): Request => request
  .get(`${BASE_API_LINK}/v1/me`);

export const AUTHORIZE_LINK = `${BASE_ACCOUNTS_LINK}/authorize`;

export const OAUTH2_REDIRECT_URI = process.env.NODE_ENV === 'development' ? `${DEVELOPMENT_URL}/auth/redirect` : `${PRODUCTION_URL}/auth/redirect`;
