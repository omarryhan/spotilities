export interface InitialStateInterface {
  seedTracks: string[];
  status: {
    isFetching: boolean;
  };
  results: {
    trackIds: string[];
  };
}
