import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import PlaylistList from '../components/PlaylistList';
import CurrentUserLoader from '../components/CurrentUserLoader';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Library" />
      <title>Spotilities | Library</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Library" showRightButton />
    <AppBody>
      <PlaylistList />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
