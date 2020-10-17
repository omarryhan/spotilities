import { createAsyncThunk } from '@reduxjs/toolkit';
import shuffle from 'lodash.shuffle';
import { CombinedStateType } from '../types';
import { spotifyApi, checkIsAuthorized } from '../utils';
import { UserLibraryPlaylistId } from '../playlistItems/actions';

const flashPlaybackError = (e: XMLHttpRequest | Error): void => {
  if (e instanceof XMLHttpRequest) {
    const errorMessage = e.response && JSON.parse(e.response)?.error?.message as undefined | string;
    if (errorMessage && errorMessage.includes('active device')) {
      alert('Playback Failed.\nPlease make sure you have a song already playing on your official Spotify app.\nThis is a limitation of Spotify.');
      // window.location.href = 'spotify:';
    } else if (errorMessage) {
      alert(errorMessage);
    } else {
      alert('Sorry something went wrong, please try again');
    }
  } else {
    alert(e.message || 'Sorry something went wrong');
  }
};

export const playTrackURIS = createAsyncThunk<
void,
{
  trackId: string;
  trackURIs: string[];
  shufflePlay?: boolean;
},
{ state: CombinedStateType }
>('play/trackURIs',
  async ({ trackId, trackURIs, shufflePlay = false }, { getState }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const shuffledTrackUris = shufflePlay ? shuffle(trackURIs) : trackURIs;
    const trackIdIndex = shuffledTrackUris.indexOf(trackId);
    const trackIdsToEnqueue = shuffledTrackUris.slice(trackIdIndex, 500);
    const restOfTheTracks = shuffledTrackUris.slice(0, trackIdIndex);
    const reorderedList = [...trackIdsToEnqueue, ...restOfTheTracks].slice(0, 500);
    try {
      await spotifyApi.setShuffle(shufflePlay);
      await spotifyApi.play({
        uris: reorderedList.map((trackURI) => `spotify:track:${trackURI}`),
      });
    } catch (e) {
      flashPlaybackError(e);
    }
  });

export const playTrackInPlaylistContext = async ({
  trackId,
  playlistId,
  shufflePlay = false,
}: {
  trackId: string;
  playlistId: string;
  shufflePlay?: boolean;
}): Promise<void> => {
  try {
    if (shufflePlay) {
      await spotifyApi.setShuffle(true);
    }
    await spotifyApi.play({
      context_uri: `spotify:playlist:${playlistId}`,
      offset: {
        uri: `spotify:track:${trackId}`,
      },
    });
  } catch (e) {
    flashPlaybackError(e);
  }
};

export const playTrackInPlaylist = createAsyncThunk<
void,
{ trackId: string; playlistId: string; shufflePlay?: boolean },
{ state: CombinedStateType }
>('play/trackInPlaylist',
  async ({ trackId, playlistId, shufflePlay = false }, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    if (playlistId === UserLibraryPlaylistId) {
      const trackIds = Object.keys(getState().playlistItems.data[playlistId].data);
      // Workaround because there's no context for "Saved tracks"
      await dispatch(playTrackURIS({ trackId, trackURIs: trackIds }));
    } else {
      await playTrackInPlaylistContext({
        trackId,
        playlistId,
        shufflePlay,
      });
    }
  });

export const playPlaylist = createAsyncThunk<
void,
{ playlistId: string; shufflePlay?: boolean},
{ state: CombinedStateType }
>('shufflePlay/playlist',
  async ({ playlistId, shufflePlay = true }, { getState, dispatch }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    const trackIds = Object.keys(state.playlistItems.data[playlistId]?.data);

    if (playlistId === UserLibraryPlaylistId) {
      await dispatch(playTrackURIS({
        trackId: trackIds[0],
        trackURIs: trackIds,
        shufflePlay,
      }));
    } else {
      await playTrackInPlaylistContext({
        trackId: trackIds[Math.floor(Math.random() * trackIds.length)],
        playlistId,
        shufflePlay,
      });
    }

    return undefined;
  });
