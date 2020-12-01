import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';
import Settings from '../components/Settings';
import DisplaySettings from '../components/DisplaySettings';
import AccountSettings from '../components/AccountSettings';
import AppSettings from '../components/AppSettings';
import Feedback from '../components/Feedback';

const Page: NextPage<{}> = () => (
  <>
    <Head>
      <meta name="title" content="Spoxify | Settings" />
      <title>Spoxify | Settings</title>
    </Head>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <TopNav title="Settings" showBackButton />
    <AppBody>
      <Settings>
        <DisplaySettings />
        <AccountSettings />
        <Feedback />
        <AppSettings />
      </Settings>
    </AppBody>
    <BottomNav />
  </>
);

export default Page;
