import React from 'react';
import { NextPage } from 'next';

import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';
import TopNav from '../components/TopNav';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Recommendations" showSettingsButton />
    <AppBody>
      Recommendations
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
