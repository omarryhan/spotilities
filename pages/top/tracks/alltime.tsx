import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import TopNav from '../../../components/TopNav';
import BottomNav from '../../../components/BottomNav';
import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';
import Snackbar from '../../../components/Snackbar';

import TopTracksList from '../../../components/TopTracksList';
import TopResourceNavbar from '../../../components/TopResourceNavbar';
import TopTrackOrArtist from '../../../components/TopTrackOrArtist';

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Top tracks | All time" />
      <title>Spotilities | Top tracks | All time</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <Snackbar />
    <TopNav title="Top" showRightButton />
    <AppBody>
      <TopTrackOrArtist currentType="tracks" currentDuration="alltime" />
      <TopTracksList currentType="tracks" currentDuration="alltime" />
      <TopResourceNavbar currentType="tracks" currentDuration="alltime" />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
