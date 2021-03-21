import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import LandingPage from '../components/LandingPage';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Home" />
      <title>Spotilities | Home</title>
    </Head>
    <LandingPage />
  </>
);

export default Page;
