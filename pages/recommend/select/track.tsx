import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import AppBody from '../../../components/AppBody';
import PlaylistItemsList from '../../../components/PlaylistItemsList';
import TopNav from '../../../components/TopNav';

import { CombinedStateType } from '../../../redux/types';
import { fetchUserPlaylistItems } from '../../../redux/playlistItems/actions';
import { addTrackSeed } from '../../../redux/recommendations/actions';

const Page: NextPage = () => {
  let playlistId = '';
  if (typeof window !== 'undefined' && window.location.href.split('/').length === 7) {
    // eslint-disable-next-line prefer-destructuring
    playlistId = window.location.href.split('/')[6];
  }

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
  ): void => {
    dispatch(addTrackSeed(trackId));
    Router.push('/recommend/select/seed-tracks');
  };

  return (
    <>
      <Head>
        <meta name="title" content="Spotilities | Select Track" />
        <title>Spotilities | Select Track</title>
      </Head>
      <TopNav showBackButton title="Select Track" />
      <AppBody>
        <PlaylistItemsList playlistId={playlistId} onTrackClick={onTrackClick} />
      </AppBody>
    </>
  );
};

export default Page;
