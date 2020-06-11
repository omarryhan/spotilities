import React from 'react';
import { NextPage } from 'next';

import { wrapper } from '../../../redux';

import TopNav from '../../../components/TopNav';
import BottomNav from '../../../components/BottomNav';
import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';

import TopTracksList from '../../../components/TopTracksList';
import TopFirstNavbar from '../../../components/TopFirstNavbar';
import TopSecondNavbar from '../../../components/TopSecondNavbar';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Top tracks of all time" showSettingsButton />
    <AppBody>
      <TopTracksList currentType="tracks" currentDuration="allTime" />
      <TopSecondNavbar currentType="tracks" currentDuration="allTime" />
      <TopFirstNavbar currentType="tracks" currentDuration="allTime" />
    </AppBody>
    <BottomNav />
  </>
);

export default wrapper.withRedux(Page);
