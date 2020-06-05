import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './Styled';
import PlaylistListItem from '../PlaylistListItem';
import Skeleton from './Skeleton';
import { CombinedStateType } from '../../redux/types';
import { fetchUserPlaylists } from '../../redux/playlists/actions';
import { AllPlaylists } from '../../redux/playlists/types';

const Component: React.FC<{}> = () => {
  const accessToken = useSelector<CombinedStateType, string>(
    (state) => state.user.token.accessToken,
  );
  const playlists = useSelector<CombinedStateType, AllPlaylists>(
    (state) => state.playlists.data,
  );
  const isFetchingPlaylists = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.status.isFetching,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (accessToken) {
        await dispatch(fetchUserPlaylists());
      }
    };
    effect();
  }, [dispatch, accessToken]);

  return (
    <Container>
      {
        !isFetchingPlaylists
          ? Object.keys(playlists).length
            ? Object.keys(playlists).map((playlistKey) => (
              <PlaylistListItem playlistId={playlists[playlistKey].id} />
            ))
            : <Skeleton />
          : <Skeleton />
      }
    </Container>
  );
};

export default Component;
