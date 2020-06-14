import React from 'react';
import { NextPage } from 'next';

import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';
import TopNav from '../components/TopNav';
import SeedTracksSection from '../components/SeedTracksSection';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Recommendations" showSettingsButton />
    <AppBody>
      <SeedTracksSection />
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
