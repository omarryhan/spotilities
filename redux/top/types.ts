export type AvailableResourceTypes = 'tracks' | 'artists';
export type AvailableDurations = 'oneMonth' | 'threeMonths' | 'allTime';

export interface TopType {
  data: string[]; // track or artist IDS
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}

export interface InitialStateInterface {
  tracks: {
    [key in AvailableDurations]: TopType;
  };
  artists: {
    [key in AvailableDurations]: TopType;
  };
}
