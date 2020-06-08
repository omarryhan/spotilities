import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import {
  Container,
  ImageSection,
  TitleSection,
  Name,
  LeftSection,
  ArtistAndAlbumName,
  RightSection,
  Img,
} from './Styled';
import { playTrackInPlaylist } from '../../redux/playback/actions';


const Component: React.FC<{trackId: string; playlistId: string}> = ({ trackId, playlistId }) => {
  const dispatch = useDispatch();

  const trackName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.name,
  );

  const artistName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.artists[0].name,
  );

  const albumName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.album.name,
  );

  const albumYear = useSelector<CombinedStateType, string>(
    // @ts-ignore
    (state) => state.tracks.data[trackId]?.data?.album.release_date,
  );

  const trackImage = useSelector<CombinedStateType, string | undefined>(
    (state) => state.tracks.data[trackId]?.data?.album.images[0]?.url,
  );

  return (
    <Container
      onClick={(): void => { dispatch(playTrackInPlaylist({ trackId, playlistId })); }}
    >
      <LeftSection fullWidth>
        <ImageSection>
          <Img
            src={trackImage}
            alt="Track album cover"
          />
        </ImageSection>

        <TitleSection>
          <Name>
            {trackName}
          </Name>

          <ArtistAndAlbumName>
            {`${artistName} . ${albumName} ${albumYear ? `. ${albumYear.substring(0, 4)}` : ''}`}
          </ArtistAndAlbumName>
        </TitleSection>
      </LeftSection>
    </Container>
  );
};

export default Component;
