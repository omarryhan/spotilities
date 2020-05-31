import React from 'react';
import Router from 'next/router';
import { NextPage } from 'next';

const Page: NextPage<{}> = () => {
  React.useEffect(() => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);
    if (params.get('error')) {
      throw new Error('Failed to get access token');
    }

    console.log(window.location.href);

    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (!accessToken) {
      throw new Error('Incorrect authorization redirect. Please report this error to the developer');
    }

    console.log(accessToken);
    console.log(expiresIn);
    Router.push('/');
    // setTimeout(() => Router.push('/'), 10000);
    // setTimeout(window.close, 2000);
  });
  return (
    null
  );
};

export default Page;
