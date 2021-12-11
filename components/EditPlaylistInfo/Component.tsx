import React, { useState } from 'react';
import { ColorExtractor } from 'react-color-extractor';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import trim from 'lodash.trim';

import { styledComponentsTheme } from '../../configs/theme';
import {
  Container,
  PlaylistCoverPhotoWrapper,
  BackgroundGradient,
  EditCoverButtonContainer,
  EditCoverButton,
  Form,
  InputBox,
  Label,
  Input,
  TextArea,
  TwoButtonsContainer,
  SubmitButton,
  CancelButton,
} from './Styled';
import { CombinedStateType } from '../../redux/types';
import { updateUserPlaylistInfo } from '../../redux/playlists/actions';

interface Props {
  playlistId: string;
}

const Component: React.FC<Props> = ({ playlistId }) => {
  const [bgColor, setBgColor] = React.useState(styledComponentsTheme.colors.gray.dark);

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );

  const playlistDescription = useSelector<CombinedStateType, string | null>(
    (state) => state.playlists.data[playlistId]?.description,
  ) || '';

  const playlistPhotos = useSelector<CombinedStateType, string[]>(
    (state) => state.playlists.data[playlistId]?.images.map((image) => image.url),
  );

  const isUpdatingPlaylist = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.status.isUpdating,
  );

  const defaultValues = {
    name: playlistName,
    description: playlistDescription,
  };

  const [name, setName] = useState(defaultValues.name);
  const [description, setDescription] = useState(defaultValues.description);
  const reset = () => {
    setName('');
    setDescription('');
  };

  const dispatch = useDispatch();

  const router = useRouter();

  const setColor = (colors: string[]): void => {
    setBgColor(colors[5]);
  };

  return (
    <Container>
      <BackgroundGradient
        bgColor={bgColor}
      >
        <PlaylistCoverPhotoWrapper>
          <ColorExtractor getColors={setColor}>
            { /* ColorExtractor only accepts <img>, that's why
                    we're not using a styled component */ }
            <img
              style={{ width: '100%' }}
              src={playlistPhotos ? playlistPhotos[0] || '/cover_art/fallback_cover_icon.png' : ''}
              alt={`${playlistName} playlist cover`}
              onError={(e): void => {
                // @ts-expect-error missing in lib
                e.target.src = '/cover_art/fallback_cover_icon.png';
              }}
            />
          </ColorExtractor>
        </PlaylistCoverPhotoWrapper>

        <EditCoverButtonContainer>
          <EditCoverButton
            type="button"
            onClick={
              (): void => {
                if (name !== defaultValues.name || description !== defaultValues.description) {
                  window.alert('Please save your changes first, then edit the cover picture.');
                  return;
                }

                router.push(
                  '/playlists/edit-cover', `/playlists/edit-cover/${playlistId}`,
                );
              }
            }
          >
            Create cover
          </EditCoverButton>
        </EditCoverButtonContainer>
      </BackgroundGradient>

      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          if (description.includes('\n')) {
            alert('Description cannot include more than one line (Shouldn\'t hit enter).\nThis is a limitation of Spotify.');
            return;
          }

          if (!trim(name)) {
            alert('Name cannot be empty');
            return;
          }

          if (playlistDescription && !trim(description)) {
            alert('Description cannot be empty.\nThis is a limitation of Spotify.');
            return;
          }

          await dispatch(updateUserPlaylistInfo({
            name,
            description,
            id: playlistId,
          }));
          reset();
          router.push('/playlists', `/playlists/${playlistId}`);
        }
        }
      >
        <InputBox>
          <Label
            htmlFor="name"
          >
            Name
            <Input
              type="text"
              id="name"
              placeholder="Playlist name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Label>
        </InputBox>

        <InputBox>
          <Label
            htmlFor="description"
          >
            Description
            <TextArea
              id="description"
              placeholder="Playlist description"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Label>
        </InputBox>

        <TwoButtonsContainer>
          <CancelButton
            type="button"
            onClick={(): void => router.back()}
          >
            Cancel
          </CancelButton>

          <SubmitButton
            type="submit"
            disabled={isUpdatingPlaylist}
          >
            {
              isUpdatingPlaylist ? 'Submitting...' : 'Submit'
            }
          </SubmitButton>
        </TwoButtonsContainer>
      </Form>
    </Container>
  );
};

export default Component;
