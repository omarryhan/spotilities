import { Request } from 'superagent';
import {
  AUTHORIZE_LINK,
  OAUTH2_REDIRECT_URI,
} from '../configs/urls';
import { SPOTIFY_CLIENT_ID, SPOTIFY_SCOPES_NEEDED } from '../configs/services';
import { ApiJsonResponse, ApiErrorResponse } from '../types';

export const createAuthorizeLink = (): string => {
  const encodedRedirectURI = encodeURI(OAUTH2_REDIRECT_URI);
  const scopes = encodeURI(SPOTIFY_SCOPES_NEEDED.join(' '));
  return `${AUTHORIZE_LINK}?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodedRedirectURI}&scope=${scopes}&show_dialog=false`;
};


export const openAuthorizeWindow = async (): Promise<void> => {
  window.location.href = createAuthorizeLink();
};


export const send = async <ExpectedResponse = void>(
  request: Request, accessToken: string, expiresAt: number,
): Promise<ExpectedResponse | ApiJsonResponse | ApiErrorResponse> => {
  if (!accessToken || !expiresAt || (Date.now() >= expiresAt)) {
    openAuthorizeWindow();
    // Application closes
  }

  request.set('Authorization', `Bearer ${accessToken}`);

  let response;
  try {
    response = await request;
  } catch (e) {
    response = e.response;
  }

  return response?.body;
};
