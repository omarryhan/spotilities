import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import AppBody from '../../components/AppBody';
import TopNav from '../../components/TopNav';
import BottomNav from '../../components/BottomNav';
import ProgressBar from '../../components/TopProgressBar';
import ResultsSection from '../../components/ResultsSection';
import Snackbar from '../../components/Snackbar';

const Page: NextPage = () => (
  <>
    <Head>
      <meta name="title" content="Spotilities | Recommendation Results" />
      <title>Spotilities | Recommendation Results</title>
    </Head>
    <Snackbar />
    <TopNav showBackButton title="Results" />
    <AppBody>
      <ProgressBar progress={100} />
      <ResultsSection />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
