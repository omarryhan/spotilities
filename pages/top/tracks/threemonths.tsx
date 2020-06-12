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
      <TopTrackOrArtist currentType="tracks" currentDuration="threemonths" />
      <TopTracksList currentType="tracks" currentDuration="threemonths" />
      <TopResourceNavbar currentType="tracks" currentDuration="threemonths" />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
