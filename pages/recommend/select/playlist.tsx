import React from 'react';
import Router from 'next/router';
import { NextPage } from 'next';

import TopNav from '../../../components/TopNav';
import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import PlaylistList from '../../../components/PlaylistList';
import CurrentUserLoader from '../../../components/CurrentUserLoader';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Select Playlist" showBackButton />
    <AppBody>
      <PlaylistList onPlaylistItemClick={(playlistId: string): Promise<boolean> => Router.push('/recommend/select/track', `/recommend/select/track/${playlistId}`)} />
    </AppBody>
  </>
);

export default Page;
