import SpotifyApi from 'spotify-web-api-js';
import { createAuthorizeLink, getCurrentBaseUrl } from '../configs/urls';

export const spotifyApi = new SpotifyApi();

export const openAuthorizeWindow = async (): Promise<void> => {
  const currentHref = window.location.href;
  const hrefToSave = currentHref.includes('/playlists/') ? `${getCurrentBaseUrl()}/library` : currentHref;
  window.localStorage.setItem('authRedirect', hrefToSave);
  window.location.href = createAuthorizeLink();
};

export const checkIsAuthorized = (accessToken: string, expiresAt: number, error: string): void => {
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
