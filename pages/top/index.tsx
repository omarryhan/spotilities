import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

import { wrapper } from '../../redux';

const Page: NextPage<{}> = () => {
  React.useEffect(() => {
    Router.push('/top/tracks/oneMonth');
  }, []);

  return null;
};

export default wrapper.withRedux(Page);
