import React from 'react';
import { NextPage } from 'next';

import AppBody from '../../components/AppBody';
import TopNav from '../../components/TopNav';
import BottomNav from '../../components/BottomNav';
import ProgressBar from '../../components/TopProgressBar';
import ResultsSection from '../../components/ResultsSection';

const Page: NextPage<{}> = () => (
  <>
    <TopNav showBackButton title="Results" />
    <AppBody>
      <ProgressBar progress={100} />
      <ResultsSection />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
