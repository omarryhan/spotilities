import React from 'react';
import { NextPage } from 'next';

import { wrapper } from '../redux';

import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Top" showSettingsButton />
    <AppBody>
      Top
    </AppBody>
    <BottomNav />
  </>
);

export default wrapper.withRedux(Page);
