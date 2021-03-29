import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { Button, Snackbar } from './Styled';
import { CombinedStateType } from '../../redux/types';
import { SnackbarState } from '../../redux/ui/types';
import { setSnackbarState } from '../../redux/ui/actions';

const Component: React.FC = () => {
  const snackbarState = useSelector<CombinedStateType, SnackbarState>(
    (state) => state.ui.snackbar,
  );

  const dispatch = useDispatch();

  const handleClose = (
  ): void => {
    dispatch(setSnackbarState({
      ...snackbarState,
      isOpen: false,
    }));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      isSuccess={snackbarState.type === 'success'}
      open={snackbarState.isOpen}
      autoHideDuration={snackbarState.time}
      onClose={handleClose}
      message={snackbarState.text}
      action={(
        <>
          {snackbarState.actionText
          && (
            <Button
              color="secondary"
              size="small"
              onClick={(): void => {
                snackbarState.action && snackbarState.action();
                handleClose();
              }}
            >
              {snackbarState.actionText}
            </Button>
          )}
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      )}
    />
  );
};

export default Component;
