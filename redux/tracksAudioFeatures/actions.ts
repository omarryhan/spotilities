import chunk from 'lodash.chunk';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { checkIsAuthorized, spotifyApi } from '../utils';
import { AudioFeaturesWithTrackIds } from './types';
import { CombinedStateType } from '../types';

export const setTracksAudioFeatures = createAction<AudioFeaturesWithTrackIds>('tracksAudioFeatures/set');

const fetchAudioFeatures = async (
  trackIds: string[], // max 100
): Promise<
SpotifyApi.MultipleAudioFeaturesResponse
> => await spotifyApi.getAudioFeaturesForTracks(trackIds);

export const fetchTracksAudioFeatures = createAsyncThunk<
void,
string[],
{ state: CombinedStateType }
>(
  'tracksAudioFeatures/tracks/set',
  async (trackIds, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const trackIdChunks = chunk(trackIds, 100);

    const allAudioFeatures = await Promise.all(
      trackIdChunks.map(async (trackIdChunk) => {
        const audioFeatures = await fetchAudioFeatures(trackIdChunk);
        const audioFeaturesWithTrackIds: AudioFeaturesWithTrackIds = {};
        trackIdChunk.forEach((trackId, index) => {
          audioFeaturesWithTrackIds[trackId] = audioFeatures.audio_features[index];
        });
        return audioFeaturesWithTrackIds;
      }),
    );

    let falttenedAllAudioFeatures: AudioFeaturesWithTrackIds = {};
    allAudioFeatures.forEach((audioFeaturesChunk) => {
      falttenedAllAudioFeatures = {
        ...falttenedAllAudioFeatures,
        ...audioFeaturesChunk,
      };
    });

    dispatch(setTracksAudioFeatures(falttenedAllAudioFeatures));
  },
);

export const fetchPlaylistItemsAudioFeatures = createAsyncThunk<
void,
string,
{ state: CombinedStateType }
>(
  'tracksAudioFeatures/playlistItems/set',
  async (playlistId, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const allPlaylistItems = state.playlistItems.data[playlistId].data;
    const allTrackIds = Object.keys(allPlaylistItems);

    await dispatch(fetchTracksAudioFeatures(allTrackIds));
  },
);

export const fetchAllPlaylistsItemsAudioFeatures = createAsyncThunk<
void,
void,
{ state: CombinedStateType }
>(
  'tracksAudioFeatures/allPlaylistsItems/set',
  async (_, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const allPlaylistIds = Object.keys(state.playlistItems.data);

    await Promise.all(
      allPlaylistIds.map(
        async (playlistId) => {
          await dispatch(fetchPlaylistItemsAudioFeatures(playlistId));
        },
      ),
    );
  },
);
