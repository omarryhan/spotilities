export interface AllPlaylists {
  // key is playlist ID
  [key: string]: SpotifyApi.PlaylistObjectFull;
}

export interface InitialStateInterface {
  data: AllPlaylists;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}
