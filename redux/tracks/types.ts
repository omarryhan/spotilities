export interface Track {
  data: SpotifyApi.TrackObjectFull;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}

export interface AllTracks {
  [key: string]: Track;
}

export interface InitialStateInterface {
  data: AllTracks;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}
