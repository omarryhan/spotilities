import { createAction } from '@reduxjs/toolkit';

export const setTracks = createAction<SpotifyApi.TrackObjectFull[]>('tracks/set');
