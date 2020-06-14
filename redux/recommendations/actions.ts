import { createAction } from '@reduxjs/toolkit';

export const setTrackResults = createAction<string[]>('recommendations/trackResults/set');

export const addTrackSeed = createAction<string>('recommendations/trackSeeds/add');

export const removeSeedTrack = createAction<string>('recommendations/trackSeeds/remove');
