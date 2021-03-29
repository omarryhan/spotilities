import { createAction } from '@reduxjs/toolkit';
import { SnackbarState } from './types';

export const setSnackbarState = createAction<SnackbarState>('ui/setSnackbar');
