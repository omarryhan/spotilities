import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { fetchUserPlaylistItems } from '../../redux/playlistItems/actions';
import { fetchPlaylistItemsAudioFeatures } from '../../redux/tracksAudioFeatures/actions';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import PlaylistMetricsBars from '../PlaylistMetricsBars';
import PlaylistMetricsBarsSkeleton from '../PlaylistMetricsBars/Skeleton';
import {
  OuterContainer,
  ImageSection,
  TitleSection,
  Name,
  LeftSection,
  NumberOfTracks,
  RightSection,
  Img,
} from './Styled';
import { CombinedStateType } from '../../redux/types';
import { getOrSetAndGetCurrentSettings } from '../../utils';

interface Props {
  playlistId: string;
}

const Component: React.FC<Props> = ({ playlistId }) => {
  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId].name,
  );

  const playlistPhotos = useSelector<CombinedStateType, string[]>(
    (state) => state.playlists.data[playlistId].images.map((image) => image.url),
  );

  const playlistTracksCount = useSelector<CombinedStateType, number>(
    (state) => state.playlists.data[playlistId].tracks.total,
  );

  const playlistTracks = useSelector<CombinedStateType, AllPlaylistItems>(
    (state) => state.playlistItems.data[playlistId]?.data,
  );

  const playlistTracksCountFromTracks = typeof playlistTracks !== 'undefined'
    ? Object.keys(playlistTracks).length : 0;

  const isFetchingPlaylistsItems = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.data[playlistId]?.status?.isFetching,
  ) as boolean | undefined;

  const fetchedPlaylistsItemsOnce = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.data[playlistId]?.status?.fetchedOnce,
  ) as boolean | undefined;

  const isFetchingPlaylistsTracksAudioFeatures = useSelector<CombinedStateType, boolean>(
    (state) => state.tracksAudioFeatures.status.playlistsStatus[playlistId]?.isFetching,
  ) as boolean | undefined;

  const fetchedPLaylistsTracksAudioFeaturesOnce = useSelector<CombinedStateType, boolean>(
    (state) => state.tracksAudioFeatures.status.playlistsStatus[playlistId]?.fetchedOnce,
  ) as boolean | undefined;

  const dispatch = useDispatch();

  const { showAllPlaylistsMetrics } = getOrSetAndGetCurrentSettings();

  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      // Normally, this effect should run regardless of the isFetching and fetchedOnce status.
      // But, because this effect is very network & processing expensive
      // we have to sacrifice the accuracy of the info shown on the playlist's
      // cover. This info will only be fetched once per the app's time.
      if (
        fetchedPlaylistsItemsOnce === true
        || (
          isFetchingPlaylistsItems === true || isFetchingPlaylistsTracksAudioFeatures === true
        ) || !showAllPlaylistsMetrics) {
        return;
      }

      await dispatch(fetchUserPlaylistItems({ playlistId }));
      await dispatch(fetchPlaylistItemsAudioFeatures(playlistId));
    };

    effect();
  }, [
    dispatch,
    playlistId,
    fetchedPlaylistsItemsOnce,
    isFetchingPlaylistsItems,
    isFetchingPlaylistsTracksAudioFeatures,
    showAllPlaylistsMetrics,
  ]);

  return (
    <OuterContainer onClick={(): ReturnType<typeof Router.push> => Router.push('/playlists', `/playlists/${playlistId}`)} type="button">
      <LeftSection fullWidth={!showAllPlaylistsMetrics}>
        <ImageSection>
          <Img
            src={
              playlistPhotos.length ? playlistPhotos[0] : playlistPhotos.length > 1 ? playlistPhotos[1] : ''
            }
            alt="Playlist cover"
          />
        </ImageSection>

        <TitleSection>
          <Name>
            {playlistName}
          </Name>

          <NumberOfTracks>
            {playlistTracksCount === -1
              ? playlistTracksCountFromTracks === 0
                ? 'Lotta tracks'
                : `${playlistTracksCountFromTracks} tracks`
              : `${playlistTracksCount} tracks`}
          </NumberOfTracks>

        </TitleSection>
      </LeftSection>
      {
        isFetchingPlaylistsItems === false
        && fetchedPlaylistsItemsOnce === true
        && isFetchingPlaylistsTracksAudioFeatures === false
        && fetchedPLaylistsTracksAudioFeaturesOnce === true
        && Object.keys(playlistTracks || {}).length
        && showAllPlaylistsMetrics
          ? (
            <RightSection>
              <PlaylistMetricsBars trackIds={Object.keys(playlistTracks)} />
            </RightSection>
          )
          : showAllPlaylistsMetrics
            ? <RightSection><PlaylistMetricsBarsSkeleton /></RightSection>
            : null
      }
    </OuterContainer>
  );
};

export default Component;
