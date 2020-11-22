import React from 'react';
import { useForm } from 'react-hook-form';
import { ColorExtractor } from 'react-color-extractor';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';

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

interface FormData {
  name: string;
  description: string;
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

  const { handleSubmit, register, reset } = useForm<FormData>({
    defaultValues,
  });

  const dispatch = useDispatch();

  const router = useRouter();

  const setColor = (colors: string[]): void => {
    setBgColor(colors[5]);
  };

  console.log(isUpdatingPlaylist);

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
                // @ts-expect-error
                e.target.src = '/cover_art/fallback_cover_icon.png';
              }}
            />
          </ColorExtractor>
        </PlaylistCoverPhotoWrapper>

        <EditCoverButtonContainer>
          <EditCoverButton
            type="button"
            onClick={
              (): ReturnType<typeof Router.push> => router.push(
                '/playlists/edit-cover', `/playlists/edit-cover/${playlistId}`,
              )
            }
          >
            Edit cover
          </EditCoverButton>
        </EditCoverButtonContainer>
      </BackgroundGradient>

      <Form
        onSubmit={handleSubmit(
          async ({ name, description }) => {
            if (description.includes('\n')) {
              alert('Description cannot include more than one line (Shouldn\'t hit enter).\nThis is a limitation of Spotify.');
              return;
            }

            if (playlistDescription && !description) {
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
          },
          () => {
            alert('Something went wrong :(.');
          },
        )}
      >
        <InputBox>
          <Label
            htmlFor="name"
          >
            Name
            <Input
              name="name"
              type="text"
              id="name"
              placeholder="Playlist name"
              ref={register}
            />
          </Label>
        </InputBox>

        <InputBox>
          <Label
            htmlFor="description"
          >
            Description
            <TextArea
              name="description"
              id="description"
              placeholder="Playlist description"
              ref={register}
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
            isUpdatingPlaylist={isUpdatingPlaylist}
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
