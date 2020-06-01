import { createAction } from '@reduxjs/toolkit';
import { Token } from './types';


export const setAccessToken = createAction<Token>('user/setAccessToken');

export const setTokenErrorMessage = createAction<string>('user/setTokenErrorMessage');
