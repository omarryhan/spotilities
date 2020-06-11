import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';

const Page: NextPage<{}> = () => {
  React.useEffect(() => {
    // users are most likely to encounter a 404 when in a playlist
    // Playlists return a 404 when first called from the browser (as opposed to the next router)
    // because playlists cannot be prerendered, because we don't have access to
    // access tokens when pre rendering/
    Router.push('/library');
  }, []);
  return null;
};

export default Page;
