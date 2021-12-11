import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import shuffle from 'lodash.shuffle';
import { MetricAttributes, TunableMetrics } from './types';
import { spotifyApi, checkIsAuthorized } from '../utils';
import { CombinedStateType } from '../types';
import { allAttributes } from '../../components/MetricSelector/Data';
import { setTracks } from '../tracks/actions';
import { fetchTracksAudioFeatures } from '../tracksAudioFeatures/actions';
// import {
//   convertMyTracksToPlaylist,
//   getAllTracksFromPlaylistItems,
// } from '../playlistItems/actions';

export const setTrackResults = createAction<string[]>('recommendations/trackResults/set');

export const addTrackSeed = createAction<string>('recommendations/trackSeeds/add');

export const removeSeedTrack = createAction<string>('recommendations/trackSeeds/remove');

export const clearRecommendationsInput = createAction<void>('recommendations/input/clear');

export const clearRecommendationsResults = createAction<void>('recommendations/results/clear');

// Used to skip selecting tracks for recommendations
export const setRandomSeedTracks = createAsyncThunk<
{ randomSeedTracks: SpotifyApi.SavedTrackObject[] },
void,
{ state: CombinedStateType }
>('recommendations/setRandomSeedTracks',
  async (_, { dispatch, getState }) => {
    const state = getState();
    checkIsAuthorized(
      state.user.token.accessToken,
      state.user.token.expiresAt,
      state.user.tokenStatus.errorMessage,
    );

    // fetches first 5 tracks from User Library (aka saved items aka likes) if available.
    // const first50Tracks = await spotifyApi.getMySavedTracks({ limit: 50 });
    // const convertedFirst5Tracks = convertMyTracksToPlaylist(first50Tracks);
    // dispatch(setTracks(getAllTracksFromPlaylistItems(convertedFirst5Tracks)));
    // first50Tracks.items = shuffle(first50Tracks.items);
    // // first 5 tracks of the shuffled list. 5 is the max.
    // // Won't fail if there's less than 5 items in the array.
    // return { randomSeedTracks: first50Tracks.items.slice(0, 5) };

    // 5 of your top tracks this month
    // I think this is a better default than 5 of your most recent 50 saved tracks
    const first50Tracks = await spotifyApi.getMyTopTracks({
      time_range: 'short_term',
      limit: 50,
    });
    dispatch(setTracks(first50Tracks.items));
    first50Tracks.items = shuffle(first50Tracks.items);
    const retval = first50Tracks.items.map((track) => ({
      added_at: '',
      track,
    }));
    return { randomSeedTracks: retval.slice(0, 5) };
  });

export const setMetricIsActivated = createAction<{
  name: TunableMetrics;
  value: boolean;
}>('recommendations/metric/isActivated/set');

export const setMetric = createAction<{
  name: TunableMetrics;
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
      // clear previous results if any
      dispatch(clearRecommendationsResults());

      const state = getState();
      checkIsAuthorized(
        state.user.token.accessToken,
        state.user.token.expiresAt,
        state.user.tokenStatus.errorMessage,
      );

      const seedTrackIds = state.recommendations.seedTracks;

      const attributes = state.recommendations.metrics;

      const attributeKeys = Object.keys(attributes) as TunableMetrics[];
      const attributeKeysToSend = attributeKeys.filter((key) => attributes[key].isActivated);

      const allAttributesArguments: { [key: string]: number } = {};

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
        ...(!Object.keys(allAttributesArguments).length
          ? {
            max_popularity: 100,
            min_popularity: 0,
          }
          : allAttributesArguments
        ),
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
      // dispatch(clearRecommendationsInput());
    }
  });
