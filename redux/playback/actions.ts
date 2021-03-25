import { createAsyncThunk } from '@reduxjs/toolkit';
import shuffle from 'lodash.shuffle';
import { CombinedStateType } from '../types';
import { spotifyApi, checkIsAuthorized } from '../utils';
import { UserLibraryPlaylistId } from '../playlistItems/actions';

// Oh man, this function has grown huge.
// It just works (tm).
const flashPlaybackError = (
  e: XMLHttpRequest | Error, { track, playlist }: {
    track?: string;
    playlist?: string;
  },
  fallback?: () => Promise<void>,
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
    if (errorMessage && errorMessage.includes('active device')) {
      if (fallback) {
        if (window.confirm(
          'Playback failed.\nDo you want to create a playlist instead?',
        )) {
          fallback();
        } else {
          routeToSong();
        }
      } else {
        alert('Playback failed.\nPlease make sure you have a song already playing on your official Spotify app.\nThis is a limitation of Spotify.');
        routeToSong();
      }
    } else if (errorMessage) {
      if (fallback) {
        if (window.confirm(
          'Playback failed.\nDo you want to create a playlist instead?',
        )) {
          fallback();
        } else {
          routeToSong();
        }
      } else {
        alert(errorMessage);
        routeToSong();
      }
    } else if (fallback) {
      if (window.confirm(
        'Playback failed.\nDo you want to create a playlist instead?',
      )) {
        fallback();
      } else {
        routeToSong();
      }
    } else {
      alert('Sorry, something went wrong. Please try again.');
    }
  } else {
    alert(e.message || 'Sorry, something went wrong.');
    routeToSong();
  }
};

export const playTrackURIS = createAsyncThunk<
void,
{
  trackId: string;
  trackURIs: string[];
  shufflePlay?: boolean;
  // eslint bug
  // eslint-disable-next-line
  fallback?:() => Promise<void>
  // eslint bug
  // eslint-disable-next-line
},
{ state: CombinedStateType }
// eslint bug
// eslint-disable-next-line
  >('play/trackURIs',
    async ({
      trackId, trackURIs, shufflePlay = false, fallback,
    }, { getState }) => {
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
        await spotifyApi.play({
          uris: reorderedList.map((trackURI) => `spotify:track:${trackURI}`),
        });
      } catch (e) {
        flashPlaybackError(e, { track: reorderedList[0] }, fallback);
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
    flashPlaybackError(e, { track: `spotify:track:${trackId}?context=spotify%3Aplaylist%3A${playlistId}` });
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
