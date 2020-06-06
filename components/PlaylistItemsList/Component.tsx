import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import { fetchUserPlaylistItems } from '../../redux/playlistItems/actions';
import { fetchPlaylistItemsAudioFeatures } from '../../redux/tracksAudioFeatures/actions';
import { Container } from './Styled';


const Component: React.FC<{playlistId: string}> = ({ playlistId }) => {
  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );
  const playlistPhotos = useSelector<CombinedStateType, string[]>(
    (state) => state.playlists.data[playlistId]?.images.map((image) => image.url),
  );

  const playlistTracksCount = useSelector<CombinedStateType, number>(
    (state) => state.playlists.data[playlistId]?.tracks.total,
  );

  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data,
  );

  const isFetchingPlaylistsItems = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.data[playlistId]?.status?.isFetching,
  ) as boolean | undefined;

  const isFetchingPlaylistsTracksAudioFeatures = useSelector<CombinedStateType, boolean>(
    (state) => state.tracksAudioFeatures.status.playlistsStatus[playlistId]?.isFetching,
  ) as boolean | undefined;

  const dispatch = useDispatch();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (!playlistId || isFetchingPlaylistsItems || isFetchingPlaylistsTracksAudioFeatures) {
        return;
      }

      await dispatch(fetchUserPlaylistItems({ playlistId }));
      await dispatch(fetchPlaylistItemsAudioFeatures(playlistId));
    };

    effect();
    // Disabling this because we actually want to read isFetchingPlaylists
    // and isFetchingPlaylistsTracksAudioFeaturse once.
    // The reason we're reading both properties:
    // We don't want this component to fetch playlist tracks when it's already doing it
    // This especially slow with large playlists
    // The reason we only want to read them once is that if we don't do that,
    // this effect will infinitely loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    playlistId,
  ]);


  React.useEffect(() => {
  });

  return (
    <Container>
      {playlistName}
    </Container>
  );
};

export default Component;
