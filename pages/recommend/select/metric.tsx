import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';
import TopNav from '../../../components/TopNav';
import MetricSelector from '../../../components/MetricSelector';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Select a Filter" />
      <title>Spotilities | Select a Filter</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Select a filter" showBackButton />
    <AppBody>
      <MetricSelector />
    </AppBody>
  </>
);

export default Page;
