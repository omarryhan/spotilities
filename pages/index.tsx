import React from 'react';
import { NextPage } from 'next';
import BottomNav from '../components/BottomNav';
import LoginButton from '../components/LoginButton';


const Component: NextPage<{}> = () => (
  <>
    <h1>
      Hello
    </h1>
    <LoginButton />
    <BottomNav />
  </>
);

export default Component;
