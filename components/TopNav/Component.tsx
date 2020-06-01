import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateInterface } from '../../redux/reducer';
import { fetchUserProfile } from '../../redux/profile/actions';
import { DataInterface } from '../../redux/profile/types';

import {
  Header,
  Nav,
  Title,
  GreetingText,
  Name,
  NavItem,
} from './Styled';


const Component: React.FC<{title: string}> = ({ title }) => {
  const profile = useSelector<RootStateInterface>(
    (state) => state.profile.data,
  ) as DataInterface;
  const isFetching = useSelector<RootStateInterface>(
    (state) => state.profile.status.isFetching,
  ) as boolean;
  const accessToken = useSelector<RootStateInterface>(
    (state) => state.user.token.accessToken,
  ) as string | '';

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
