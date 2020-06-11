import { createAsyncThunk } from '@reduxjs/toolkit';
import { spotifyApi, checkIsAuthorized } from '../utils';
import { setArtists } from '../artists/actions';
import { setTracks } from '../tracks/actions';
import { fetchTracksAudioFeatures } from '../tracksAudioFeatures/actions';
import { AvailableDurations, AvailableResourceTypes } from './types';
import { CombinedStateType } from '../types';


const durationsApiMapping = {
  oneMonth: 'short_term',
  threeMonths: 'medium_term',
  allTime: 'long_term',
};

export const fetchTopItems = createAsyncThunk<
{
  resourceType: AvailableResourceTypes;
  duration: AvailableDurations;
  items: string[];
},
{
  resourceType: AvailableResourceTypes;
  duration: AvailableDurations;
},
{
  state: CombinedStateType;
}
>(
  'top/set',
  async ({ resourceType, duration }, { getState, dispatch }) => {
    const state = getState();
    const { token } = state.user;
    const { accessToken, expiresAt } = token;
    checkIsAuthorized(accessToken, expiresAt);
    spotifyApi.setAccessToken(accessToken);

    let response;
    if (resourceType === 'tracks') {
      response = await spotifyApi.getMyTopTracks({
        time_range: durationsApiMapping[duration],
        limit: 50,
      });

      const trackIds = response.items.map((track) => track.id);

      dispatch(setTracks(response.items));

      await dispatch(fetchTracksAudioFeatures(trackIds));
      return {
        resourceType,
        duration,
        items: trackIds,
      };
    } else {
      response = await spotifyApi.getMyTopArtists({
        time_range: durationsApiMapping[duration],
        limit: 50,
      });

      const artistIds = response.items.map((artist) => artist.id);

      dispatch(setArtists(response.items));
      return {
        resourceType,
        duration,
        items: artistIds,
      };
    }
  },
);
