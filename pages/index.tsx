import React from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';

import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';
import LoginButton from '../components/LoginButton';
import { wrapper } from '../redux';

import { RootStateInterface } from '../redux/reducer';
import AccessTokenLoader from '../components/AccessTokenLoader';


const Page: NextPage<{}> = () => {
  const accessToken = useSelector<RootStateInterface>(
    (state) => state.user.token.accessToken,
  ) as string;
  return (
    <>
      <AccessTokenLoader />
      <TopNav />
      <h1>
        Hello
      </h1>
      <h2>
        Access token is:
        {' '}
        {accessToken || 'null'}
      </h2>
      <LoginButton />
      <BottomNav />
    </>
  );
};

export default wrapper.withRedux(Page);
