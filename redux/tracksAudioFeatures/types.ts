// Actions stuff
export interface AudioFeaturesWithTrackIds {
  [key: string]: SpotifyApi.AudioFeaturesObject;
}

// Reducer stuff
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

export interface PlaylistsStatus {
  [key: string]: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}

export interface InitialStateInterface {
  data: AllTracksFeatures;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
    playlistsStatus: PlaylistsStatus;
  };
}
