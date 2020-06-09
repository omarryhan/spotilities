import React from 'react';
import { useSelector } from 'react-redux';
import { openAuthorizeWindow } from '../../redux/utils';
import { CombinedStateType } from '../../redux/types';

/*
  VERY IMPORTANT: Mounting this in _app.ts will cause the
  app to infinitely loop. Though it shouldn't but the first trigger
  to the effect below will not be able to read the access token.
*/
const Component: React.FC<{}> = () => {
  const accessToken = useSelector<CombinedStateType, string>(
    (state) => state.user.token.accessToken,
  );
  const errorMessage = useSelector<CombinedStateType, string>(
    (state) => state.user.tokenStatus.errorMessage,
  );

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (!accessToken && !errorMessage) {
        openAuthorizeWindow();
      }
    };
    effect();
  });

  return null;
};

export default Component;
