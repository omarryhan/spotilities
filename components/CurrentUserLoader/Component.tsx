import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { fetchUserProfile } from '../../redux/profile/actions';

const Component: React.FC = () => {
  const accessToken = useSelector<CombinedStateType, string>(
    (state) => state.user.token.accessToken,
  );

  // don't fetch user if their ID exists
  const userId = useSelector<CombinedStateType, string | undefined>(
    (state) => state.profile.data.id,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (accessToken && !userId) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, accessToken, userId]);

  return (
    null
  );
};

export default Component;
