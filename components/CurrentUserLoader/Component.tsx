import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { fetchUserProfile } from '../../redux/profile/actions';

const Component: React.FC<{}> = () => {
  const accessToken = useSelector<CombinedStateType, string>(
    (state) => state.user.token.accessToken,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, accessToken]);

  return (
    null
  );
};

export default Component;
