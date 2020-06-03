export interface TrackFeatures {
  data: SpotifyApi.AudioFeaturesObject;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}

export interface AllTracksFeatures {
  // key is trackId
  [key: string]: TrackFeatures;
}

export interface InitialStateInterface {
  data: AllTracksFeatures;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}
