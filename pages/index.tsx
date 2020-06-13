import React from 'react';
import { NextPage } from 'next';

import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';
import TopNav from '../components/TopNav';
import RecommendButton from '../components/RecommendButton';
import MetricSliderSection from '../components/MetricsSliderSection';
import SeedTracksSection from '../components/SeedTracksSection';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Recommendations" showSettingsButton />
    <AppBody>
      <div style={{ height: '5vh' }} />
      <SeedTracksSection />
      <RecommendButton />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
