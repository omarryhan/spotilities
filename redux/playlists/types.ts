export interface AllPlaylists {
  // key is playlist ID
  [key: string]: SpotifyApi.PlaylistObjectSimplified;
}

export interface InitialStateInterface {
  data: AllPlaylists;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
    isUpdating: boolean;
  };
}
