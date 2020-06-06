import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';
import { setTracks } from '../tracks/actions';
import { CombinedStateType } from '../types';

interface FetchUserPlaylistItemsPayload {
  playlistId: string;
  playlistItems: SpotifyApi.PlaylistTrackObject[];
}

const getAllTracksFromPlaylistItems = (
  playlistItems: SpotifyApi.PlaylistTrackResponse,
): SpotifyApi.TrackObjectFull[] => playlistItems.items.map(
  (playlistItem) => (playlistItem.track as SpotifyApi.TrackObjectFull),
);

export const deletePlaylistsItems = createAction<{isFetching: boolean}>('playlistsItems/delete');

export const fetchUserLibraryAsPlaylist = async (): Promise<SpotifyApi.PlaylistTrackResponse> => {
  const fullResponse = await getAllPages<SpotifyApi.UsersSavedTracksResponse>(
    spotifyApi.getMySavedTracks({ limit: 50 }),
  );
  return {
    ...fullResponse,
    items: fullResponse.items.map((track) => ({
      added_at: track.added_at,
      track: track.track,
      is_local: false,
      added_by: {
        type: 'user' as const,
        uri: '',
        id: '',
        href: '',
        external_urls: {
          spotify: '',
        },
      },
    })),
  };
};

export const fetchUserPlaylistItems = createAsyncThunk<
FetchUserPlaylistItemsPayload,
// TODO: remove fetchPlaylistItemsAudioFeatures. Will call this action directly
// from the component
{ playlistId: string; dispatchSetAudioFeatures?: boolean },
{ state: CombinedStateType }
>(
  'playlistItems/set',
  async ({ playlistId, dispatchSetAudioFeatures = false }, { dispatch, getState }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    let fullResponse;
    if (playlistId === 'userLibrary') {
      fullResponse = await fetchUserLibraryAsPlaylist();
    } else {
      fullResponse = await getAllPages<SpotifyApi.PlaylistTrackResponse>(
        spotifyApi.getPlaylistTracks(playlistId, { limit: 50 }),
      );
    }

    dispatch(setTracks(getAllTracksFromPlaylistItems(fullResponse)));
    return { playlistId, playlistItems: fullResponse.items };
  },
);

export const fetchAllUserPlaylistsItems = createAsyncThunk<
void,
void,
{ state: CombinedStateType }
>(
  'allPlaylistsItems/set',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    dispatch(deletePlaylistsItems({ isFetching: true }));

    const playlists = state.playlists.data;

    const allPlaylistIds = Object.keys(playlists);

    await Promise.all(
      allPlaylistIds.map((playlistId) => dispatch(fetchUserPlaylistItems({ playlistId }))),
    );
  },
);
