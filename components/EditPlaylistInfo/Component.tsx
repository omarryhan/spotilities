import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

  const {
    handleSubmit, register, reset, formState,
  } = useForm<FormData>({
    defaultValues,
  });

  const handleBeforeUnload = (e: BeforeUnloadEvent): string => {
    const confirmationMessage = 'You have unsaved changes. Discard?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    if (!formState.isDirty) {
      return (): void => {};
    }

    // 1. Handle back button
    router.beforePopState(() => (!!window.confirm('You have unsaved changes. Discard?')));

    // 2. Handle exit window
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 3. Handle push state (e.g. edit cover)
    // will handle in the button handler instead

    return (): void => {
      router.beforePopState(() => true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

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
              (): void => {
                if (formState.isDirty) {
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
        onSubmit={handleSubmit(
          async ({ name, description }) => {
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
