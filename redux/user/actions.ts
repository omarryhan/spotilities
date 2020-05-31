import superagent from 'superagent';
import { createAction } from '@reduxjs/toolkit';
import { Tokens } from './types';
import {
  ACCESS_TOKEN as ACCESS_TOKEN_URL,
} from '../../configs/urls';


export const fetchAccessToken = async (): Promise<Tokens | void> => {
  try {
    const response = await superagent
      .post(ACCESS_TOKEN_URL);
    if (response.body && response.body.data) {
      return {
        accessToken: response.body.data.value,
        expiresAt: response.body.data.expiresIn + Date.now(),
      };
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

export const setAccessToken = createAction<Tokens>('user/setAccessToken');
