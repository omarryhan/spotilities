import React from 'react';
import { useSelector } from 'react-redux';
import { openAuthorizeWindow } from '../../redux/utils';
import { CombinedStateType } from '../../redux/types';

/*
  VERY IMPORTANT: Mounting this component in _app.tsx
  instead of mounting it to normal compoenents will cause the
  app to infinitely loop. It shouldn't, but for some reason
  the first trigger of the effect below will not be able to
  read the access token when mounted in _app.tsx.
*/
const Component: React.FC = () => {
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
