import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

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
    <Head>
      <meta name="title" content="Spoxify | Top artists | 3 months" />
      <title>Spoxify | Top artists | 3 months</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Top" showSettingsButton />
    <AppBody>
      <TopTrackOrArtist currentType="artists" currentDuration="threemonths" />
      <TopArtistsList currentType="artists" currentDuration="threemonths" />
      <TopResourceNavbar currentType="artists" currentDuration="threemonths" />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
