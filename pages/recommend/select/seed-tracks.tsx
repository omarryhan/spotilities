import React from 'react';
import { NextPage } from 'next';

import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';
import TopNav from '../../../components/TopNav';
import SeedTracksSection from '../../../components/SeedTracksSection';
import ProgressBar from '../../../components/TopProgressBar';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Select Seed Tracks" showBackButton />
    <AppBody>
      <ProgressBar progress={33} />
      <SeedTracksSection />
    </AppBody>
  </>
);

export default Page;
