import SpotifyApi from 'spotify-web-api-js';
import { createAuthorizeLink } from '../configs/urls';

export const spotifyApi = new SpotifyApi();

export const openAuthorizeWindow = async (): Promise<void> => {
  window.location.href = createAuthorizeLink();
};

export const checkIsAuthorized = (accessToken: string, expiresAt: number): void => {
  if (!accessToken || !expiresAt || (Date.now() >= expiresAt)) {
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
): Promise<Response> => {
  const paginatedResponse = await request;

  let currentResponse = paginatedResponse;

  while (currentResponse.next) {
    currentResponse = await spotifyApi.getGeneric(
      currentResponse.next,
    ) as Response;
    paginatedResponse.items = paginatedResponse.items.concat(currentResponse.items);
  }

  return paginatedResponse;
};
