import React from 'react';
import { useSelector } from 'react-redux';
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

interface Props {
  playlistId: string;
}

//  isFetchingPlaylistsItems || isFetchingPlaylistsFeatures
//    ? 'fetching...'
//    : 'fetched'

const Component: React.FC<Props> = ({ playlistId }) => {
  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId].name,
  );
  const playlistPhotos = useSelector<CombinedStateType, string[]>(
    (state) => state.playlists.data[playlistId].images.map((image) => image.url),
  );
  // const playlistDescription = useSelector<CombinedStateType, string>(
  //   // @ts-ignore description doesn't exist in the typings :/
  //   (state) => state.playlists.data[playlistId].description,
  // );
  const playlistTracksCount = useSelector<CombinedStateType, number>(
    (state) => state.playlists.data[playlistId].tracks.total,
  );

  const isFetchingPlaylistsItems = useSelector<CombinedStateType, boolean>(
    (state) => state.playlistItems.status.isFetching,
  );

  const isFetchingPlaylistsFeatures = useSelector<CombinedStateType, boolean>(
    (state) => state.tracksAudioFeatures.status.isFetching,
  );

  return (
    <OuterContainer>
      <LeftSection>
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
            {playlistTracksCount}
            {' '}
            tracks
          </NumberOfTracks>

        </TitleSection>
      </LeftSection>
      <RightSection>
        {isFetchingPlaylistsItems.toString() + isFetchingPlaylistsFeatures.toString()}
      </RightSection>
    </OuterContainer>
  );
};

export default Component;
