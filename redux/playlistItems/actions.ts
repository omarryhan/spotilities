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

const UserLibraryPlaylistId = 'userLibrary';

export const deletePlaylistsItems = createAction<{isFetching: boolean}>('playlistsItems/delete');

export const setPlaylistItems = createAction<FetchUserPlaylistItemsPayload>('playlistItems/set');

const convertMyTracksToPlaylist = (
  fullResponse: SpotifyApi.UsersSavedTracksResponse,
): SpotifyApi.PlaylistTrackResponse => ({
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
});

export const fetchUserLibraryAsPlaylist = createAsyncThunk<void, void, { state: CombinedStateType}>('userLibrary/set',
  async (_, { dispatch, getState }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    await getAllPages<SpotifyApi.UsersSavedTracksResponse>(
      spotifyApi.getMySavedTracks({ limit: 50 }),
      (eachPage) => {
        const convertedTracks = convertMyTracksToPlaylist(eachPage);
        dispatch(setPlaylistItems(
          { playlistId: UserLibraryPlaylistId, playlistItems: convertedTracks.items },
        ));
        dispatch(setTracks(getAllTracksFromPlaylistItems(convertedTracks)));
      },
    );
  });


export const fetchUserPlaylistItems = createAsyncThunk<
{ playlistId: string },
{ playlistId: string; dispatchSetAudioFeatures?: boolean },
{ state: CombinedStateType }
>(
  'playlistItems/set',
  async ({ playlistId, dispatchSetAudioFeatures = false }, { dispatch, getState }) => {
    if (playlistId === UserLibraryPlaylistId) {
      await dispatch(fetchUserLibraryAsPlaylist());
      return { playlistId };
    }

    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    const dispatchCallback = (eachPage: SpotifyApi.PlaylistTrackResponse): void => {
      dispatch(setPlaylistItems({ playlistId, playlistItems: eachPage.items }));
      dispatch(setTracks(getAllTracksFromPlaylistItems(eachPage)));
    };

    await getAllPages<SpotifyApi.PlaylistTrackResponse>(
      spotifyApi.getPlaylistTracks(playlistId, { limit: 50 }),
      dispatchCallback,
    );
    return { playlistId };
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
