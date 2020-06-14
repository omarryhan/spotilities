import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import AppBody from '../../../components/AppBody';
import PlaylistItemsList from '../../../components/PlaylistItemsList';
import TopNav from '../../../components/TopNav';

import { CombinedStateType } from '../../../redux/types';
import { fetchUserPlaylistItems } from '../../../redux/playlistItems/actions';
import { addTrackSeed } from '../../../redux/recommendations/actions';

// This page should only be accessed dynamically on the browser
// Calling /playlists/your_playlist_id from the browser will return a 404
// I don't think there's a way around that
// When this app routes to this page, it should shallowly update the URL to include
// the playlist_id.
const Page: NextPage<{}> = () => {
  let playlistId = '';
  if (typeof window !== 'undefined' && window.location.href.split('/').length === 7) {
    // eslint-disable-next-line prefer-destructuring
    playlistId = window.location.href.split('/')[6];
  }

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );

  const isFetchingPlaylistsItems = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.data[playlistId]?.status?.isFetching,
  ) as boolean | undefined;

  const dispatch = useDispatch();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (!playlistId || isFetchingPlaylistsItems) {
        return;
      }

      await dispatch(fetchUserPlaylistItems({ playlistId, dispatchSetAudioFeatures: true }));
    };

    effect();
    // Disabling this because we actually want to read isFetchingPlaylists
    // and isFetchingPlaylistsTracksAudioFeaturse once.
    // The reason we're reading both properties:
    // We don't want this component to fetch playlist tracks when it's already doing it
    // This especially slow with large playlists
    // The reason we only want to read them once is that if we don't do that,
    // this effect will infinitely loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // isFetchingPlaylistsItems,
    dispatch,
    playlistId,
  ]);

  const onTrackClick = (
    trackId: string,
    playlistId_: string,
    inThisListOfTracks?: string[],
  ): void => {
    dispatch(addTrackSeed(trackId));
    Router.push('/recommend/select/seed-tracks');
  };

  return (
    <>
      <TopNav showBackButton title="Select Track" />
      <AppBody>
        <PlaylistItemsList playlistId={playlistId} onTrackClick={onTrackClick} />
      </AppBody>
    </>
  );
};

export default Page;
