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
    <TopNav title="Top tracks this month" showSettingsButton />
    <AppBody>
      <TopTrackOrArtist currentType="tracks" currentDuration="oneMonth" />
      <TopTracksList currentType="tracks" currentDuration="oneMonth" />
      <TopResourceNavbar currentType="tracks" currentDuration="oneMonth" />
    </AppBody>
    <BottomNav />
  </>
);

export default wrapper.withRedux(Page);
