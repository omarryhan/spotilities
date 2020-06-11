import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

const Page: NextPage<{}> = () => {
  React.useEffect(() => {
    Router.push('/top/tracks/oneMonth');
  }, []);

  return null;
};

export default Page;
