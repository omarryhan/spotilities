import SpotifyApi from 'spotify-web-api-js';
import { createAuthorizeLink } from '../configs/urls';

export const spotifyApi = new SpotifyApi();

export const openAuthorizeWindow = async (): Promise<void> => {
  window.localStorage.setItem('authRedirect', window.location.href);
  window.location.href = createAuthorizeLink();
};

export const checkIsAuthorized = (accessToken: string, expiresAt: number, error?: string): void => {
  if ((!accessToken || !expiresAt || (Date.now() >= expiresAt)) && !error) {
    openAuthorizeWindow();
    // Application closes
  }
};

interface Pagination {
  next?: string;
  items: object[];
}

export const getAllPages = async <Response extends Pagination>(
  request: Promise<Response>,
  callbackAfterEachPage?: (response: Response) => Promise<void>,
): Promise<Response> => {
  // fetch for the first time and dispatch
  const paginatedResponse = await request;
  if (callbackAfterEachPage) {
    await callbackAfterEachPage(paginatedResponse);
  }

  // if next property is available iterate
  let currentResponse = paginatedResponse;
  while (currentResponse.next) {
    currentResponse = await spotifyApi.getGeneric(
      currentResponse.next,
    ) as Response;
    if (callbackAfterEachPage) {
      await callbackAfterEachPage(currentResponse);
    }
    paginatedResponse.items = paginatedResponse.items.concat(currentResponse.items);
  }

  return paginatedResponse;
};
