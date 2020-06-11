import React from 'react';
import { NextPage } from 'next';

import { wrapper } from '../../../redux';

import TopNav from '../../../components/TopNav';
import BottomNav from '../../../components/BottomNav';
import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';

import TopArtistsList from '../../../components/TopArtistsList';
import TopResourceNavbar from '../../../components/TopResourceNavbar';
import TopTrackOrArtist from '../../../components/TopTrackOrArtist';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Top" showSettingsButton />
    <AppBody>
      <TopTrackOrArtist currentType="artists" currentDuration="oneMonth" />
      <TopArtistsList currentType="artists" currentDuration="oneMonth" />
      <TopResourceNavbar currentType="artists" currentDuration="oneMonth" />
    </AppBody>
    <BottomNav />
  </>
);

export default wrapper.withRedux(Page);
