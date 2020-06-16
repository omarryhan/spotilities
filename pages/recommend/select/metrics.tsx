import React from 'react';
import { NextPage } from 'next';

import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';
import TopNav from '../../../components/TopNav';
import MetricsSliderSection from '../../../components/MetricsSliderSection';
import ProgressBar from '../../../components/TopProgressBar';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Fine Tuning" showBackButton />
    <AppBody>
      <ProgressBar progress={66} />
      <MetricsSliderSection />
    </AppBody>
  </>
);

export default Page;
