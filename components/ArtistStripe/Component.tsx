import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import {
  Container,
  Button,
  ImageSection,
  TitleSection,
  Name,
  Img,
} from './Styled';

interface Props {
  artistId: string;
}

const Component: React.FC<Props> = ({
  artistId,
}) => {
  const artistName = useSelector<CombinedStateType, string | undefined>(
    (state) => state.artists.data[artistId]?.data?.name,
  );

  const artistImage = useSelector<CombinedStateType, string | undefined>(
    (state) => state.artists.data[artistId]?.data?.images[0]?.url,
  );

  const artistURI = useSelector<CombinedStateType, string>(
    (state) => state.artists.data[artistId]?.data?.uri,
  );

  return (
    <Button
      onClick={(): void => {
        window.location.href = artistURI;
      }}
      type="button"
    >
      <Container>

        <ImageSection>
          <Img
            src={artistImage}
            alt="Image of the artist"
          />
        </ImageSection>

        <TitleSection>
          <Name>
            {artistName}
          </Name>
        </TitleSection>
      </Container>
    </Button>
  );
};

export default Component;
