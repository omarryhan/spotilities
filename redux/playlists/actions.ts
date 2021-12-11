import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';
import { CombinedStateType } from '../types';
import { setSnackbarState } from '../ui/actions';

export const deletePlaylists = createAction<void>('playlists/delete');

const userLibraryPlaylist = {
  tracks: {
    href: '',
    total: -1,
  },
  collaborative: false,
  external_urls: {
    spotify: '',
  },
  href: '',
  description: 'Liked tracks',
  id: 'userLibrary',
  images: [{
    url: '/cover_art/spotify_likes_icon.png',
  }],
  name: 'Saved Tracks',
  owner: {
    external_urls: {
      spotify: '',
    },
    href: '',
    id: '',
    type: 'user' as const,
    uri: '',
  },
  public: false,
  snapshot_id: '',
  type: 'playlist' as const,
  uri: '',
};

export const updateUserPlaylistCover = createAsyncThunk<
void,
{ id: string; img: string; router: ReturnType<typeof useRouter> },
{ state: CombinedStateType }
>(
  'playlists/update/cover',
  async ({ img, id, router }, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const handleFailedUploadForUnknownReason = (status: number): void => {
      alert(`Something went wrong.\nStatus:${status}`);
    };

    const handleUploadError = (message?: string): void => {
      ReactGA.event({
        action: 'error',
        category: 'CoverUploadError',
        label: `Message: ${message}`,
      });
    };

    try {
      // Trying to fix a bug on Firefox Android
      // Not sure why this method is failing only there.
      // await spotifyApi.uploadCustomPlaylistCoverImage(id, img);
      await fetch(`https://api.spotify.com/v1/playlists/${id}/images`, {
        headers: {
          Authorization: `Bearer ${state.user.token.accessToken}`,
          'Content-Type': 'image/jpeg',
        },
        method: 'PUT',
        body: img,
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSNotSupportingCredentials
        credentials: 'omit',
      });

      // Some buffer so that when that when you refresh the playlists
      // you gett the new info
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      if (e instanceof XMLHttpRequest) {
        const errorMessage = e.response && JSON.parse(
          e.response,
        )?.error?.message as undefined | string;

        handleUploadError();
        if (errorMessage) {
          alert(`${errorMessage} | Error code: ${e.status}`);
        } else {
          handleFailedUploadForUnknownReason(e.status);
        }
      } else {
        handleUploadError((e as Error).message);
        (e as Error).message ? alert((e as Error).message) : handleFailedUploadForUnknownReason((e as any).status);
      }
      return;
    } finally {
      await dispatch(fetchUserPlaylists(state.profile.data.id));
    }
    router.push('/library');
    // router.back();
  },
);

export const updateUserPlaylistInfo = createAsyncThunk<
void,
{ id: string; name: string; description: string },
{ state: CombinedStateType }
>(
  'playlists/update/info',
  async ({
    id, name, description,
  }, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const payload: { name: string; description?: string } = {
      name,
    };

    if (description) {
      payload.description = description;
    }

    try {
      await spotifyApi.changePlaylistDetails(
        id, payload,
      );

      // Some buffer so that when that when you refresh the playlists
      // you get an uptodate response
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (e) {
      if (e instanceof XMLHttpRequest) {
        const errorMessage = e.response && JSON.parse(
          e.response,
        )?.error?.message as undefined | string;

        if (errorMessage && errorMessage.includes('description is empty')) {
          alert('Description cannot be empty.\nThis is a limitation of Spotify.');
          // window.location.href = 'spotify:';
        } else if (errorMessage) {
          alert(errorMessage);
        } else {
          alert('Something went wrong');
        }
      } else {
        alert((e as Error).message || 'Something went wrong');
      }
    } finally {
      await dispatch(fetchUserPlaylists(state.profile.data.id));
    }
  },
);

export const fetchUserPlaylists = createAsyncThunk<
SpotifyApi.PlaylistObjectSimplified[],
string,
{ state: CombinedStateType }
>(
  'playlists/set',
  async (userId, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const fullResponse = await getAllPages<SpotifyApi.ListOfUsersPlaylistsResponse>(
      spotifyApi.getUserPlaylists(userId, { limit: 50 }),
    );

    fullResponse.items.unshift(userLibraryPlaylist);

    return fullResponse.items;
  },
);

export const createUserPlaylist = createAsyncThunk<
void,
{ name: string; trackIds: string[]; description: string },
{ state: CombinedStateType }
>(
  'playlists/new',
  async ({ name, trackIds, description }, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const createPlaylistResponse = await spotifyApi.createPlaylist(
      state.profile.data.id,
      {
        name,
        public: false,
        description: description || '',
      },
    );

    await spotifyApi.addTracksToPlaylist(
      createPlaylistResponse.id,
      trackIds.map((trackId) => `spotify:track:${trackId}`),
    );

    dispatch(setSnackbarState({
      ...state.ui.snackbar,
      isOpen: true,
      text: 'Playlist created',
      type: 'success',
      actionText: 'Visit 🔗',
      action: () => { window.location.href = `spotify:playlist:${createPlaylistResponse.id}`; },
      time: 4000,
    }));
  },
);
