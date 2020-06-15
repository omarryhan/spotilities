import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MetricAttributes, TunableMetrics } from './types';
import { spotifyApi, checkIsAuthorized } from '../utils';
import { CombinedStateType } from '../types';
import { allAttributes } from '../../components/MetricSelector/Data';
import { setTracks } from '../tracks/actions';
import { fetchTracksAudioFeatures } from '../tracksAudioFeatures/actions';

export const setTrackResults = createAction<string[]>('recommendations/trackResults/set');

export const addTrackSeed = createAction<string>('recommendations/trackSeeds/add');

export const removeSeedTrack = createAction<string>('recommendations/trackSeeds/remove');

export const clearRecommendationsInput = createAction<void>('recommendations/input/clear');

export const clearRecommendationsResults = createAction<void>('recommendations/results/clear');

export const setMetric = createAction<{
  name: string;
  attributes: MetricAttributes;
}>('recommendations/metric/set');

export const fetchRecommendations = createAsyncThunk<
void,
void,
{
  state: CombinedStateType;
}
>('recommendations/fetch',
  async (_, { getState, dispatch }) => {
    try {
      const state = getState();
      const { token } = state.user;
      const { accessToken, expiresAt } = token;
      const { errorMessage } = state.user.tokenStatus;
      checkIsAuthorized(accessToken, expiresAt, errorMessage);
      spotifyApi.setAccessToken(accessToken);

      // clear previous results if any
      dispatch(clearRecommendationsResults());

      const seedTrackIds = state.recommendations.seedTracks;

      if (!seedTrackIds.length) {
        // shouldn't normally happen
        // Only have it here so the console doesn't show errors
        // in develeopment
        return;
      }

      const attributes = state.recommendations.metrics;

      const attributeKeys = Object.keys(attributes) as TunableMetrics[];
      const attributeKeysToSend = attributeKeys.filter((key) => attributes[key].isActivated);

      const allAttributesArguments: {[key: string]: number} = {};

      attributeKeysToSend.forEach((key) => {
        const maxKey = `max_${key}`;
        const minKey = `min_${key}`;

        const minAndMax = allAttributes[key]?.resultsTransformer({
          max: attributes[key].max as number,
          min: attributes[key].min as number,
        });

        allAttributesArguments[maxKey] = minAndMax?.max as number;
        allAttributesArguments[minKey] = minAndMax?.min as number;
      });

      const results = await spotifyApi.getRecommendations({
        market: 'from_token',
        seed_tracks: seedTrackIds,
        limit: 50,
        ...allAttributesArguments,
      });

      if (!results.tracks.length) {
        return;
      }

      const resultsTrackIds = results.tracks.map((track) => track.id);
      dispatch(setTrackResults(resultsTrackIds));

      const fullTracks = await spotifyApi.getTracks(resultsTrackIds);
      dispatch(setTracks(fullTracks.tracks));
      await dispatch(fetchTracksAudioFeatures(resultsTrackIds));
    } finally {
      dispatch(clearRecommendationsInput());
    }
  });
