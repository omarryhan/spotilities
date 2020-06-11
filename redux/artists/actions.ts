import { createAction } from '@reduxjs/toolkit';

export const setArtists = createAction<SpotifyApi.ArtistObjectFull[]>('artists/set');
