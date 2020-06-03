import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkIsAuthorized, getAllPages, spotifyApi } from '../utils';
import { AllPlaylists } from '../playlists/types';
import { setTracks } from '../tracks/actions';

interface FetchUserPlaylistItemsPayload {
  playlistId: string;
  playlistItems: SpotifyApi.PlaylistTrackObject[];
}

const getAllTracksFromPlaylistItems = (
  playlistItems: SpotifyApi.PlaylistTrackResponse,
): SpotifyApi.TrackObjectFull[] => playlistItems.items.map(
  (playlistItem) => (playlistItem.track as SpotifyApi.TrackObjectFull),
);

export const fetchUserPlaylistItems = createAsyncThunk<
FetchUserPlaylistItemsPayload,
string,
{ state: any }
>(
  'playlistItems/set',
  async (playlistId, { dispatch }) => {
    const fullResponse = await getAllPages<SpotifyApi.PlaylistTrackResponse>(
      spotifyApi.getPlaylistTracks(playlistId, { limit: 50 }),
    );
    dispatch(setTracks(getAllTracksFromPlaylistItems(fullResponse)));
    return { playlistId, playlistItems: fullResponse.items };
  },
);

export const fetchAllUserPlaylistsItems = createAsyncThunk<
void,
void,
{ state: any }
>(
  'allPlaylistsItems/set',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    const playlists = state.playlists.data as AllPlaylists;

    const allPlaylistIds = Object.keys(playlists);

    // allPlaylistIds.map(async (playlistId) => {
    //   await dispatch(fetchUserPlaylistItems(playlistId));
    // });

    await Promise.all(
      allPlaylistIds.map((playlistId) => dispatch(fetchUserPlaylistItems(playlistId))),
    );
  },
);
