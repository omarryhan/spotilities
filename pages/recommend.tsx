import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';
import TopNav from '../components/TopNav';
import RecommendGetStarted from '../components/RecommendGetStarted';

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Recommendations" />
      <title>Spotilities | Recommendations</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Recommendations" showRightButton />
    <AppBody>
      <RecommendGetStarted />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
