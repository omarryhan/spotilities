import React from 'react';
import { NextPage } from 'next';

import { wrapper } from '../redux';

import BottomNav from '../components/BottomNav';
import PageTitle from '../components/PageTitle';
import AccessTokenLoader from '../components/AccessTokenLoader';
import AppBody from '../components/AppBody';
import PlaylistList from '../components/PlaylistList';
import CurrentUserLoader from '../components/CurrentUserLoader';


const Page: NextPage<{}> = () => (
  <>
    <AccessTokenLoader />
    <CurrentUserLoader />
    <AppBody>
      <PageTitle title="Playlists" />
      <PlaylistList />
    </AppBody>
    <BottomNav page="library" />
  </>
);

export default wrapper.withRedux(Page);
