import { createAsyncThunk } from '@reduxjs/toolkit';
import shuffle from 'lodash.shuffle';
import { CombinedStateType } from '../types';
import { spotifyApi, checkIsAuthorized } from '../utils';
import { UserLibraryPlaylistId } from '../playlistItems/actions';
import { setSnackbarState } from '../ui/actions';

const flashPlaybackError = (
  e: XMLHttpRequest | Error, { track, playlist }: {
    track?: string;
    playlist?: string;
  },
): void => {
  const routeToSong = (): void => {
    if (playlist) {
      window.location.href = `spotify:playlist:${playlist}`;
    } else if (track) {
      window.location.href = `spotify:track:${track}`;
    } else {
      window.location.href = 'spotify:';
    }
  };
  if (e instanceof XMLHttpRequest) {
    const errorMessage = e.response && JSON.parse(e.response)?.error?.message as undefined | string;
    // This might look like a pointless if-statement, but there used to be stuff here.
    // Leaving it for convenience
    if (errorMessage && errorMessage.includes('active device')) {
      routeToSong();
    } else if (errorMessage) {
      routeToSong();
    } else {
      routeToSong();
    }
  } else {
    routeToSong();
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
  async ({
    trackId, trackURIs, shufflePlay = false,
  }, { getState, dispatch }) => {
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
      // window.open(`https://open.spotify.com/track/${reorderedList.shift()}`);
      // window.location.href = `https://open.spotify.com/track/${reorderedList.shift()}`;
      // window.location.href = `spotify:track:${reorderedList.shift()}`;
      // await new Promise((resolve) => setTimeout(resolve, 10000));
      // reorderedList.map(async (trackToQueue: string) => {
      //   await spotifyApi.queue(`spotify:track:${trackToQueue}`);
      // });

      await spotifyApi.setShuffle(shufflePlay);
      dispatch(setSnackbarState({
        ...state.ui.snackbar,
        isOpen: true,
        type: 'neutral',
        actionText: '',
        action: () => {},
        time: 2500,
        text: 'Playing...',
      }));
      await spotifyApi.play({
        uris: reorderedList.map((trackURI) => `spotify:track:${trackURI}`),
      });
    } catch (e) {
      flashPlaybackError(e, { track: reorderedList[0] });
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
    // flashPlaybackError(e, { playlist: playlistId });
    flashPlaybackError(e, { track: `${trackId}?context=spotify%3Aplaylist%3A${playlistId}` });
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
      dispatch(setSnackbarState({
        ...state.ui.snackbar,
        isOpen: true,
        type: 'neutral',
        actionText: '',
        action: () => {},
        time: 2500,
        text: 'Playing...',
      }));
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
      dispatch(setSnackbarState({
        ...state.ui.snackbar,
        isOpen: true,
        type: 'neutral',
        actionText: '',
        action: () => {},
        time: 2500,
        text: 'Playing...',
      }));
      await playTrackInPlaylistContext({
        trackId: trackIds[Math.floor(Math.random() * trackIds.length)],
        playlistId,
        shufflePlay,
      });
    }

    return undefined;
  });
