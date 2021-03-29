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

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Top tracks | 3 Months" />
      <title>Spotilities | Top tracks | 3 months</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <Snackbar />
    <TopNav title="Top" showRightButton />
    <AppBody>
      <TopTrackOrArtist currentType="tracks" currentDuration="threemonths" />
      <TopTracksList currentType="tracks" currentDuration="threemonths" />
      <TopResourceNavbar currentType="tracks" currentDuration="threemonths" />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
