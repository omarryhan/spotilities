import React from 'react';
import { NextPage } from 'next';

import TopNav from '../../../components/TopNav';
import BottomNav from '../../../components/BottomNav';
import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';

import TopTracksList from '../../../components/TopTracksList';
import TopResourceNavbar from '../../../components/TopResourceNavbar';
import TopTrackOrArtist from '../../../components/TopTrackOrArtist';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Top" showSettingsButton />
    <AppBody>
      <TopTrackOrArtist currentType="tracks" currentDuration="allTime" />
      <TopTracksList currentType="tracks" currentDuration="allTime" />
      <TopResourceNavbar currentType="tracks" currentDuration="allTime" />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
