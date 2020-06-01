import React from 'react';
import { NextPage } from 'next';

import { wrapper } from '../redux';

import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <TopNav title="Top" />
    <AppBody>
      Top
    </AppBody>
    <BottomNav page="top" />
  </>
);

export default wrapper.withRedux(Page);
