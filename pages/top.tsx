import React from 'react';
import { NextPage } from 'next';

import { wrapper } from '../redux';

import BottomNav from '../components/BottomNav';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import CurrentUserLoader from '../components/CurrentUserLoader';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <AppBody>
      Top
    </AppBody>
    <BottomNav page="top" />
  </>
);

export default wrapper.withRedux(Page);
