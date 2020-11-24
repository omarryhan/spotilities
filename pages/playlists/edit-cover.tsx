import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { useSelector } from 'react-redux';
import AppBody from '../../components/AppBody';
import TopNav from '../../components/TopNav';
import EditPlaylistCover from '../../components/EditPlaylistCover';

import { CombinedStateType } from '../../redux/types';

// This page should only be accessed dynamically on the browser
// Calling /playlists/your_playlist_id from the browser will return a 404
// I don't think there's a way around that
// When this app routes to this page, it should shallow(ly) update the URL to include
// the playlist_id.
const Page: NextPage<{}> = () => {
  let playlistId = '';
  if (typeof window !== 'undefined' && window.location.href.split('/').length === 6) {
    // eslint-disable-next-line prefer-destructuring
    playlistId = window.location.href.split('/')[5];
  }

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );

  return (
    <>
      <Head>
        <meta name="title" content="Spoxify | Edit cover" />
        <title>Spoxify | Edit cover</title>
      </Head>
      <TopNav
        showBackButton
        title={`Edit cover: ${playlistName}`}
      />
      <AppBody>
        <EditPlaylistCover playlistId={playlistId} />
      </AppBody>
    </>
  );
};

export default Page;
