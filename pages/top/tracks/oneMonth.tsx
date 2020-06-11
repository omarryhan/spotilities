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
    <TopNav title="Top tracks this month" showSettingsButton />
    <AppBody>
      <TopTracksList currentType="tracks" currentDuration="oneMonth" />
      <TopSecondNavbar currentType="tracks" currentDuration="oneMonth" />
      <TopFirstNavbar currentType="tracks" currentDuration="oneMonth" />
    </AppBody>
    <BottomNav />
  </>
);

export default wrapper.withRedux(Page);
