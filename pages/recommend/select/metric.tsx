import React from 'react';
import { NextPage } from 'next';

import AccessTokenLoader from '../../../components/AccessTokenLoader';
import AppBody from '../../../components/AppBody';
import CurrentUserLoader from '../../../components/CurrentUserLoader';
import TopNav from '../../../components/TopNav';
import MetricSelector from '../../../components/MetricSelector';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Select a filter" showBackButton />
    <AppBody>
      <MetricSelector />
    </AppBody>
  </>
);

export default Page;
