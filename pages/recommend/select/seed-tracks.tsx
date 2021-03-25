import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';
import TopNav from '../../../components/TopNav';
import SeedTracksSection from '../../../components/SeedTracksSection';
import ProgressBar from '../../../components/TopProgressBar';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Select Seed Tracks" />
      <title>Spotilities | Select Seed Tracks</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Select Seed Tracks" showBackButton backTo="/recommend" />
    <AppBody>
      <ProgressBar progress={33} />
      <SeedTracksSection />
    </AppBody>
  </>
);

export default Page;
