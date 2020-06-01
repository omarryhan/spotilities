import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateInterface } from '../../redux/reducer';
import { fetchUserProfile } from '../../redux/profile/actions';
import { DataInterface } from '../../redux/profile/types';


const Component: React.FC<{}> = () => {
  const profile = useSelector<RootStateInterface>(
    (state) => state.profile.data,
  ) as DataInterface;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!profile.display_name) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile.display_name]);

  return (
    <p>
      Your name is:
      {' '}
      {JSON.stringify(profile.display_name)}
    </p>
  );
};

export default Component;
