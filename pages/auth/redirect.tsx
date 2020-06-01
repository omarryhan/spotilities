import React from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import { setAccessToken, setTokenErrorMessage } from '../../redux/user/actions';
import { wrapper } from '../../redux';

const Page: NextPage<{}> = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);

    const error = params.get('error');
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

      dispatch(setAccessToken({
        accessToken,
        expiresAt: nowDate,
      }));
    }

    Router.push('/');
  });
  return (
    null
  );
};


export default wrapper.withRedux(Page);
