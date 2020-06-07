import React from 'react';
import { ColorExtractor } from 'react-color-extractor';

import { useSelector } from 'react-redux';
import { styledComponentsTheme } from '../../configs/theme';
import { CombinedStateType } from '../../redux/types';
import { AllPlaylistItems } from '../../redux/playlistItems/types';
import {
  Container,
  Slider,
  Slides,
  Slide,
  FirstSlide,
  SecondSlide,
  PlaylistCoverPhotoWrapper,
  PlaylistTitle,
  SliderDot,
  SliderDots,
} from './Styled';

const SliderDotsSection: React.FC<{}> = () => (
  <SliderDots>
    <SliderDot />
  </SliderDots>
);

const Component: React.FC<{playlistId: string}> = ({ playlistId }) => {
  const [bgColor, setBgColor] = React.useState(styledComponentsTheme.colors.gray.dark);

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );
  const playlistPhotos = useSelector<CombinedStateType, string[] | undefined>(
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

  const backupPhotoURL = ''; // TODO

  const getColor = (colors: string[]): void => {
    console.log(colors);
    setBgColor(colors[5]);
  };

  return (
    <Container>
      <Slider>
        <Slides bgColor={bgColor}>
          <Slide bgColor={bgColor}>
            <FirstSlide>
              <PlaylistCoverPhotoWrapper>
                <ColorExtractor getColors={getColor}>
                  { /* ColorExtractor only accepts images, that's why
                  we're not using a styled component */ }
                  <img style={{ width: '100%' }} src={playlistPhotos ? playlistPhotos[0] : backupPhotoURL} alt={`${playlistName} playlist cover`} />
                </ColorExtractor>
              </PlaylistCoverPhotoWrapper>

              <PlaylistTitle>
                {playlistName}
              </PlaylistTitle>
            </FirstSlide>
          </Slide>

          <Slide bgColor={bgColor}>
            <SecondSlide>
              <PlaylistCoverPhotoWrapper>
                <img style={{ width: '100%' }} src={playlistPhotos ? playlistPhotos[0] : backupPhotoURL} alt={`${playlistName} playlist cover`} />
              </PlaylistCoverPhotoWrapper>

              <PlaylistTitle>
                {playlistName}
              </PlaylistTitle>
            </SecondSlide>
          </Slide>
        </Slides>
      </Slider>
    </Container>
  );
};

export default Component;
