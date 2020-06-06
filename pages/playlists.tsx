import React from 'react';
import { NextPage } from 'next';
import { wrapper } from '../redux/index';
import AppBody from '../components/AppBody';
import PlaylistItems from '../components/PlaylistItems';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

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

  return (
    <>
      <TopNav showBackButton title={playlistId} />
      <AppBody>
        <PlaylistItems playlistId={playlistId} />
      </AppBody>
      <BottomNav />
    </>
  );
};

export default wrapper.withRedux(Page);
