export interface InitialStateInterface {
  data: SpotifyApi.CurrentUsersProfileResponse;
  status: {
    isFetching: boolean;
    fetchedOnce: boolean;
  };
}
