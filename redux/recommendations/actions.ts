import { createAction } from '@reduxjs/toolkit';
import { MetricAttributes } from './types';

export const setTrackResults = createAction<string[]>('recommendations/trackResults/set');

export const addTrackSeed = createAction<string>('recommendations/trackSeeds/add');

export const removeSeedTrack = createAction<string>('recommendations/trackSeeds/remove');

export const setMetric = createAction<{
  name: string;
  attributes: MetricAttributes;
}>('recommendations/metric/set');
