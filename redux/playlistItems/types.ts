// partial because we'll be ommiting the track field and replacing it with trackId
export interface PlaylistItem extends Partial<SpotifyApi.PlaylistTrackObject> {
  trackId: string;
}

export interface AllPlaylistItems {
  // key is Track ID, not playlistItem ID because the API doesn't send us it.
  [key: string]: PlaylistItem;
}

export interface Playlist {
  data: AllPlaylistItems;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}

export interface AllPlaylists {
  // key is playlist ID (We cannot index by playlistItemId because it's not being sent by the API)
  [key: string]: Playlist;
}

export interface InitialStateInterface {
  data: AllPlaylists;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}
