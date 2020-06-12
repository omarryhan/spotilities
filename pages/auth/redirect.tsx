import React from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import { setAccessToken, setTokenErrorMessage } from '../../redux/user/actions';

const Page: NextPage<{}> = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);

    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get('error');
    if (error && typeof error === 'string') {
      dispatch(setTokenErrorMessage(error));
    } else {
      const accessToken = params.get('access_token');
      const expiresIn = Number(params.get('expires_in'));

      if (!accessToken) {
        throw new Error('Incorrect authorization redirect. Please report this error to the developer');
      }

      const date = new Date();
      const nowDate = date.setSeconds(date.getSeconds() + expiresIn - 60);

      dispatch(setTokenErrorMessage(''));
      dispatch(setAccessToken({
        accessToken,
        expiresAt: nowDate,
      }));
    }

    const authRedirect = window.localStorage.getItem('authRedirect')?.split('/');
    authRedirect?.shift(); // removes http (or https)
    authRedirect?.shift(); // removes empty string
    authRedirect?.shift(); // removes main domain (localhost:3000) or spotitlities.netlify.app
    const route = authRedirect?.join('/');
    Router.push(route ? `/${route}` : '/');
  });
  return (
    null
  );
};


export default Page;
