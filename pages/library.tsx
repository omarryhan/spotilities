import React from 'react';
import { NextPage } from 'next';

import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import PlaylistList from '../components/PlaylistList';
import CurrentUserLoader from '../components/CurrentUserLoader';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Library" showSettingsButton />
    <AppBody>
      <PlaylistList />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
