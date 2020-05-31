import React from 'react';
import { Button } from './Styled';
import { openAuthorizeWindow } from '../../redux/user/actions';


const onClickHanlder = async (): Promise<void> => {
  await openAuthorizeWindow();
};

const Component: React.FC<{}> = () => (
  <Button onClick={onClickHanlder} type="button">
    Login to Spotify
  </Button>
);

export default Component;
