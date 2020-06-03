import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { H1 } from './Styled';
import { RootStateInterface } from '../../redux/reducer';
import { fetchUserPlaylists } from '../../redux/playlists/actions';
import { fetchAllUserPlaylistsItems } from '../../redux/playlistItems/actions';

const Component: React.FC<{}> = () => {
  const accessToken = useSelector<RootStateInterface>(
    (state) => state.user.token.accessToken,
  ) as string | '';

  const dispatch = useDispatch();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (accessToken) {
        await dispatch(fetchUserPlaylists());
        await dispatch(fetchAllUserPlaylistsItems());
        // await dispatch(fetchAllPlaylistItemsAudioFeatures());
      }
    };
    effect();
  }, [dispatch, accessToken]);

  return (
    <H1>
      Playlist list
    </H1>
  );
};

export default Component;
