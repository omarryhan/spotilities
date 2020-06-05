import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { wrapper } from '../../redux/index';

const Page: NextPage<{}> = () => {
  React.useEffect(() => {
    console.log('Route is:');
    console.log(Router.query.id);
  });
  return (
    <>
      playlists
      {' '}
    </>
  );
};

export default wrapper.withRedux(Page);
