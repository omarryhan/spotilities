import React from 'react';
import { NextPage } from 'next';

import { wrapper } from '../../../redux';

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
    <TopNav title="Top tracks in the past 3 months" showSettingsButton />
    <AppBody>
      <TopTrackOrArtist currentType="tracks" currentDuration="threeMonths" />
      <TopTracksList currentType="tracks" currentDuration="threeMonths" />
      <TopResourceNavbar currentType="tracks" currentDuration="threeMonths" />
    </AppBody>
    <BottomNav />
  </>
);

export default wrapper.withRedux(Page);
