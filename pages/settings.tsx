import React from 'react';
import { NextPage } from 'next';
import { wrapper } from '../redux/index';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';
import Settings from '../components/Settings';
import DisplaySettings from '../components/DisplaySettings';

const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Settings" showBackButton />
    <AppBody>
      <Settings>
        <DisplaySettings />
      </Settings>
    </AppBody>
    <BottomNav />
  </>
);

export default wrapper.withRedux(Page);
