import React from 'react';
import { useSelector } from 'react-redux';
import {
  OuterContainer,
  ImageSection,
  InfoSection,
  Name,
  DetailsSection,
  DetailItem,
  DetailItemIcon,
  DetailItemTitle,
  LeftSection,
  NumberOfTracks,
  Img,
} from './Styled';
import { CombinedStateType } from '../../redux/types';

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
  // const playlistDescription = useSelector<CombinedStateType, string>(
  //   // @ts-ignore description doesn't exist in the typings :/
  //   (state) => state.playlists.data[playlistId].description,
  // );
  const playlistTracksCount = useSelector<CombinedStateType, number>(
    (state) => state.playlists.data[playlistId].tracks.total,
  );

  return (
    <OuterContainer>
      <LeftSection>
        <ImageSection>
          <Img src={playlistPhotos[0]} alt="Playlist cover" />
        </ImageSection>

        <InfoSection>
          <Name>
            {playlistName}
          </Name>

          <NumberOfTracks>
            {playlistTracksCount}
            {' '}
            tracks
          </NumberOfTracks>

          <DetailsSection>
            <DetailItem>
              <DetailItemTitle>
                {' '}
              </DetailItemTitle>

              <DetailItemIcon>
                {' '}
              </DetailItemIcon>
            </DetailItem>
          </DetailsSection>
        </InfoSection>
      </LeftSection>
    </OuterContainer>
  );
};

export default Component;
