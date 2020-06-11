export interface Artist {
  data: SpotifyApi.ArtistObjectFull;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}

export interface AllArtists {
  [key: string]: Artist;
}

export interface InitialStateInterface {
  data: AllArtists;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}
