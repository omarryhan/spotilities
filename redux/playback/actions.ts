import { createAsyncThunk } from '@reduxjs/toolkit';
import chunk from 'lodash.chunk';
import shuffle from 'lodash.shuffle';
import { CombinedStateType } from '../types';
import { spotifyApi } from '../utils';
import { UserLibraryPlaylistId } from '../playlistItems/actions';

const flashPlaybackError = (e: Error): void => {
  alert('Please make sure you have a song already playing. This is a limitation of Spotify.');
  console.error(e);
};

export const playTrackURIS = createAsyncThunk<
void,
{ trackId: string; trackURIs: string[] },
{ state: CombinedStateType }
>('play/trackURIs',
  async ({ trackId, trackURIs }) => {
    const trackIdIndex = trackURIs.indexOf(trackId);
    const trackIdsToEnqueue = trackURIs.slice(trackIdIndex, 500);
    const restOfTheTracks = trackURIs.slice(0, trackIdIndex);
    const reorderedList = [...trackIdsToEnqueue, ...restOfTheTracks].slice(0, 500);
    try {
      await spotifyApi.play({
        uris: reorderedList.map((trackURI) => `spotify:track:${trackURI}`),
      });
    } catch (e) {
      flashPlaybackError(e);
    }
  });

export const playTrackInPlaylist = createAsyncThunk<
void,
{ trackId: string; playlistId: string },
{ state: CombinedStateType }
>('play/trackInPlaylist',
  async ({ trackId, playlistId }, { getState, dispatch }) => {
    if (playlistId === UserLibraryPlaylistId) {
      // Workaround because there's no context for "Saved tracks"
      const state = getState();
      const playlistTracks = state.playlistItems.data[playlistId].data;
      const trackIds = Object.keys(playlistTracks);
      await dispatch(playTrackURIS({ trackId, trackURIs: trackIds }));
    } else {
      try {
        await spotifyApi.setShuffle(false);
        await spotifyApi.play({
          context_uri: `spotify:playlist:${playlistId}`,
          offset: { uri: `spotify:track:${trackId}` },
        });
      } catch (e) {
        flashPlaybackError(e);
      }
    }
  });

export const shufflePlayPlaylist = createAsyncThunk<
void,
string,
{ state: CombinedStateType }
>('shufflePlay/playlist',
  async (playlistId, { getState }) => {
    const state = getState();
    const playlistTracks = state.playlistItems.data[playlistId]?.data;
    const trackIds = Object.keys(playlistTracks);
    const shuffledTrackIds = shuffle(trackIds);

    if (playlistId === UserLibraryPlaylistId) {
      if (playlistTracks && Object.keys(playlistTracks).length) {
        const firstChunkOfTracks = chunk(shuffledTrackIds, 500)[0];
        const trackUris = firstChunkOfTracks.map((trackId): string => `spotify:track:${trackId}`);
        try {
          await spotifyApi.play({
            uris: trackUris,
          });
        } catch (e) {
          flashPlaybackError(e);
        }
      }
    } else {
      try {
        await spotifyApi.play({
          context_uri: `spotify:playlist:${playlistId}`,
          offset: {
            uri: `spotify:track:${shuffledTrackIds[0]}`,
          },
        });
      } catch (e) {
        flashPlaybackError(e);
      }
      await spotifyApi.setShuffle(true);
      await spotifyApi.skipToNext();
    }

    return undefined;
  });
