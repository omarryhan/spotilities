import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateInterface } from '../../redux/reducer';
import { fetchUserProfile } from '../../redux/profile/actions';

const Component: React.FC<{}> = () => {
  const accessToken = useSelector<RootStateInterface>(
    (state) => state.user.token.accessToken,
  ) as string | '';

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
