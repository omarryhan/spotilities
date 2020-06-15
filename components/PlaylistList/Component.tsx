import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './Styled';
import PlaylistListItem from '../PlaylistListItem';
import Skeleton from './Skeleton';
import { CombinedStateType } from '../../redux/types';
import { fetchUserPlaylists } from '../../redux/playlists/actions';
import { AllPlaylists } from '../../redux/playlists/types';

const Component: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPlaylistItemClick?: (playlistId: string) => any;
}> = ({ onPlaylistItemClick }) => {
  const accessToken = useSelector<CombinedStateType, string>(
    (state) => state.user.token.accessToken,
  );
  const playlists = useSelector<CombinedStateType, AllPlaylists>(
    (state) => state.playlists.data,
  );
  const isFetchingPlaylists = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.status.isFetching,
  );
  const userId = useSelector<CombinedStateType, string>(
    (state) => state.profile.data.id,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (accessToken && userId) {
        await dispatch(fetchUserPlaylists(userId));
      }
    };
    effect();
  }, [dispatch, accessToken, userId]);

  return (
    <Container>
      {
        !isFetchingPlaylists
          ? Object.keys(playlists).length
            ? Object.keys(playlists).map((playlistKey) => (
              <PlaylistListItem
                playlistId={playlists[playlistKey].id}
                key={playlists[playlistKey].id}
                onPlaylistItemClick={onPlaylistItemClick}
              />
            ))
            : <Skeleton />
          : <Skeleton />
      }
    </Container>
  );
};

export default Component;
