export type TunableMetrics = 'acousticness'
| 'danceability'
| 'duration_ms'
| 'energy'
| 'instrumentalness'
| 'liveness'
| 'loudness'
| 'popularity'
| 'speechiness'
| 'mode'
| 'key'
| 'tempo'
| 'time_signature'
| 'valence';

export interface MetricAttributes {
  min?: number;
  max?: number;
  target?: number;
  isActivated: boolean;
}

export type Metrics = {
  [key in TunableMetrics]: MetricAttributes;
};

export interface InitialStateInterface {
  seedTracks: string[];
  randomSeedTracks: string[];
  status: {
    isFetchingSeedTracks: boolean;
    isFetching: boolean;
  };
  results: {
    trackIds: string[];
  };
  metrics: Metrics;
}
