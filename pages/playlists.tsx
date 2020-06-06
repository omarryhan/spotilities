import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { wrapper } from '../redux/index';
import { CombinedStateType } from '../redux/types';
import { AllPlaylistItems } from '../redux/playlistItems/types';
import { fetchUserPlaylistItems } from '../redux/playlistItems/actions';
import { fetchPlaylistItemsAudioFeatures } from '../redux/tracksAudioFeatures/actions';

// This page should only be accessed dynamically on the browser
// Calling /playlists/your_playlist_id from the browser will return a 404
// I don't think there's a way around that
// When this app routes to this page, it should shallow(ly) update the URL to include
// the playlist_id.
const Page: NextPage<{}> = () => {
  let playlistId = '';
  if (typeof window !== 'undefined' && window.location.href.split('/').length === 5) {
    // eslint-disable-next-line prefer-destructuring
    playlistId = window.location.href.split('/')[4];
  }

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );
  const playlistPhotos = useSelector<CombinedStateType, string[]>(
    (state) => state.playlists.data[playlistId]?.images.map((image) => image.url),
  );

  const playlistTracksCount = useSelector<CombinedStateType, number>(
    (state) => state.playlists.data[playlistId]?.tracks.total,
  );

  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data,
  );

  const isFetchingPlaylistsItems = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.data[playlistId]?.status?.isFetching,
  ) as boolean | undefined;

  const isFetchingPlaylistsTracksAudioFeatures = useSelector<CombinedStateType, boolean>(
    (state) => state.tracksAudioFeatures.status.playlistsStatus[playlistId]?.isFetching,
  ) as boolean | undefined;

  const dispatch = useDispatch();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (!playlistId || isFetchingPlaylistsItems || isFetchingPlaylistsTracksAudioFeatures) {
        return;
      }

      await dispatch(fetchUserPlaylistItems({ playlistId }));
      await dispatch(fetchPlaylistItemsAudioFeatures(playlistId));
    };

    effect();
  }, [
    dispatch,
    playlistId,
    isFetchingPlaylistsItems,
    isFetchingPlaylistsTracksAudioFeatures,
  ]);


  React.useEffect(() => {
    console.log(playlistId);
  });

  return (
    <>
      playlists
      {' '}
      {playlistId}
    </>
  );
};

export default wrapper.withRedux(Page);
