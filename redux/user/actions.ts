import superagent from 'superagent';
import { createAction } from '@reduxjs/toolkit';
import { Tokens } from './types';
import {
  AUTHORIZE_LINK,
  OAUTH2_REDIRECT_URI,
} from '../../configs/urls';
import { SPOTIFY_CLIENT_ID, SPOTIFY_SCOPES_NEEDED } from '../../configs/services';


export const setAccessToken = createAction<Tokens>('user/setAccessToken');

export const createAuthorizeLink = (): string => {
  const encodedRedirectURI = encodeURI(OAUTH2_REDIRECT_URI);
  const scopes = encodeURI(SPOTIFY_SCOPES_NEEDED.join(' '));
  return `${AUTHORIZE_LINK}?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodedRedirectURI}&scope=${scopes}&show_dialog=false`;
};

export const fetchAccessToken = async (): Promise<Tokens | void> => {
  try {
    const response = await superagent
      .post(AUTHORIZE_LINK);
    if (response.body && response.body.data) {
      return {
        accessToken: response.body.data.value,
        expiresAt: response.body.data.expiresIn + Date.now(),
      };
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

/*
  Should send an ajax request to the authorization URL to attempt and
  get an access token. If not successful, openAuthorizeWindow should be called
*/
export const attemptFetchAccessToken = async (): Promise<void> => {

};

// export const openAuthorizeWindow = async (): Promise<void> => {
//   const width = 800;
//   const height = 800;
//   const left = (window.innerWidth / 2) - (width / 2);
//   const top = (window.innerHeight / 2) - (height / 2);
//   const authWindow = window.open(
//     createAuthorizeLink(),
//     '',
//     `toolbar=no, location=no, directories=no, status=no, menubar=no,
//     scrollbars=no, resizable=no, copyhistory=no
//     width=${width}, height=${height}, top=${top}, left=${left}`,
//   ) as Window;
//
//   console.log(createAuthorizeLink());
//   while (!authWindow.closed) {
//     await sleep(1000); // eslint-disable-line no-await-in-loop
//     console.log(authWindow.location.href);
//   }
//
//   const params = (new URL(authWindow.location.href)).searchParams;
//
//   if (params.get('error')) {
//     throw new Error('Failed to get access token');
//   }
//
//   const accessToken = params.get('access_token');
//   const expiresIn = params.get('expires_in');
//
//   if (accessToken) {
//     throw new Error('Incorrect authorization redirect. Please report this error to the developer');
//   }
//
//   console.log(accessToken);
//   console.log(expiresIn);
//
//
//   if (!authWindow.closed) {
//     authWindow.close();
//   }
// };

export const openAuthorizeWindow = async (): Promise<void> => {
  window.location.href = createAuthorizeLink();
};
