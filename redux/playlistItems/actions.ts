import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';
import { setTracks } from '../tracks/actions';
import { fetchTracksAudioFeatures } from '../tracksAudioFeatures/actions';
import { CombinedStateType } from '../types';

interface FetchUserPlaylistItemsPayload {
  playlistId: string;
  playlistItems: SpotifyApi.PlaylistTrackObject[];
}

export const getAllTracksFromPlaylistItems = (
  playlistItems: SpotifyApi.PlaylistTrackResponse,
): SpotifyApi.TrackObjectFull[] => playlistItems.items.map(
  (playlistItem) => (playlistItem.track as SpotifyApi.TrackObjectFull),
);

export const UserLibraryPlaylistId = 'userLibrary';

export const setPlaylistItems = createAction<FetchUserPlaylistItemsPayload>('playlistItems/set');

export const convertMyTracksToPlaylist = (
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

export const fetchUserLibraryAsPlaylist = createAsyncThunk<
void,
{ dispatchSetAudioFeatures?: boolean},
{ state: CombinedStateType}
>('userLibrary/set',
  async ({ dispatchSetAudioFeatures = false }, { dispatch, getState }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    await getAllPages<SpotifyApi.UsersSavedTracksResponse>(
      spotifyApi.getMySavedTracks({ limit: 50 }),
      async (eachPage) => {
        const convertedTracks = convertMyTracksToPlaylist(eachPage);
        dispatch(setPlaylistItems(
          { playlistId: UserLibraryPlaylistId, playlistItems: convertedTracks.items },
        ));
        dispatch(setTracks(getAllTracksFromPlaylistItems(convertedTracks)));
        if (dispatchSetAudioFeatures) {
          await dispatch(fetchTracksAudioFeatures(eachPage.items.map(
            (track) => track.track.id,
          )));
        }
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
      await dispatch(fetchUserLibraryAsPlaylist({ dispatchSetAudioFeatures }));
      return { playlistId };
    }

    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const dispatchCallback = async (eachPage: SpotifyApi.PlaylistTrackResponse): Promise<void> => {
      dispatch(setPlaylistItems({ playlistId, playlistItems: eachPage.items }));
      dispatch(setTracks(getAllTracksFromPlaylistItems(eachPage)));
      if (dispatchSetAudioFeatures) {
        await dispatch(fetchTracksAudioFeatures(eachPage.items.map(
          (track) => track.track.id,
        )));
      }
    };

    await getAllPages<SpotifyApi.PlaylistTrackResponse>(
      spotifyApi.getPlaylistTracks(playlistId, { limit: 50 }),
      dispatchCallback,
    );
    return { playlistId };
  },
);
