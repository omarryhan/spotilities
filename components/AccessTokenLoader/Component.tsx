import React from 'react';
import { useSelector } from 'react-redux';
import { openAuthorizeWindow } from '../../redux/utils';
import { RootStateInterface } from '../../redux/reducer';
import { sleep } from '../../utils';

/*
  VERY IMPORTANT: Mounting this in _app.ts will cause the
  app to infinitely loop. Though it shouldn't but the first trigger
  to the effect below will not be able to read the access token.
*/
const Component: React.FC<{}> = () => {
  const accessToken = useSelector<RootStateInterface>((state) => state.user.token.accessToken);
  const errorMessage = useSelector<RootStateInterface>(
    (state) => state.user.tokenStatus.errorMessage,
  );

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      // Just in case this effect infinetely loops.
      // To ensure we're not rate limited/blocked.
      await sleep(1000);

      if (!accessToken && !errorMessage) {
        openAuthorizeWindow();
      }
    };
    effect();
  });

  return null;
};

export default Component;
