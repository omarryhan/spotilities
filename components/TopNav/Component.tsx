import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { fetchUserProfile } from '../../redux/profile/actions';

import {
  Header,
  Nav,
  Title,
  Name,
  NavItem,
} from './Styled';


const Component: React.FC<{title: string}> = ({ title }) => {
  const profile = useSelector<CombinedStateType, SpotifyApi.CurrentUsersProfileResponse>(
    (state) => state.profile.data,
  );
  const isFetching = useSelector<CombinedStateType, boolean>(
    (state) => state.profile.status.isFetching,
  );
  const accessToken = useSelector<CombinedStateType, string>(
    (state) => state.user.token.accessToken,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!profile.display_name && accessToken) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile.display_name, accessToken]);

  const name = isFetching ? 'loading...' : profile.display_name || 'Anonymous';

  return (
    <Header>
      <Nav>
        <NavItem>
          <Title>
            {title}
          </Title>
        </NavItem>

        <NavItem>
          <Name>
            {name}
          </Name>
        </NavItem>
      </Nav>
    </Header>
  );
};

export default Component;
