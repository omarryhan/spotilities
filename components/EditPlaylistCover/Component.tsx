import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Stage,
  Layer,
  Text,
  Rect,
} from 'react-konva';
import { useRouter } from 'next/router';

import {
  Body,
  BottomNav,
  BottomEditMenus,
  BottomEditMenu,
  BottomEditMenuStatus,
  SubmitButton,
  TopBar,
  CanvasWrapper,
} from './Styled';
import { CombinedStateType } from '../../redux/types';

interface Props {
  playlistId: string;
}

type MenuSections = 'background' | 'image' | 'text';

const menuSections: MenuSections[] = [
  'background',
  'image',
  'text',
];

const Component: React.FC<Props> = ({ playlistId }) => {
  const [canvasIsDirty, setCanvasIsDirty] = React.useState(false);
  const [currentMenuSection, setCurrentMenuSection] = React.useState<MenuSections>(menuSections[0]);

  const wrapperRef = useRef(null);

  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );

  const isUpdatingPlaylist = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.status.isUpdating,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const handleBeforeUnload = (e: BeforeUnloadEvent): string => {
    const confirmationMessage = 'You have unsaved changes. Discard?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    if (!canvasIsDirty) {
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

  const [canvasWrapperWidth, setCanvasWrapperWidth] = React.useState(200);
  useEffect(() => {
    // @ts-expect-error
    setCanvasWrapperWidth(wrapperRef.current.clientWidth);
  }, []);

  return (
    <>
      <Body>
        <TopBar>
          <div />
          <SubmitButton
            onClick={(): void => {}}
          >
            Save
          </SubmitButton>
        </TopBar>

        <CanvasWrapper ref={wrapperRef}>
          <Stage
            width={canvasWrapperWidth}
            height={canvasWrapperWidth}
          >
            <Layer>
              <Rect
                fill="white"
                width={canvasWrapperWidth}
                height={canvasWrapperWidth}
              />
            </Layer>
            <Layer>
              <Text text="Work in progress" draggable />
            </Layer>
          </Stage>
        </CanvasWrapper>
      </Body>
      <BottomNav>
        <BottomEditMenus>
          {menuSections.map((section) => (
            <BottomEditMenu
              onClick={(): void => setCurrentMenuSection(section)}
              active={section === currentMenuSection}
              key={section}
            >
              <p>
                {section}
              </p>
              <BottomEditMenuStatus active={section === currentMenuSection} />
            </BottomEditMenu>
          ))}
        </BottomEditMenus>
      </BottomNav>
    </>
  );
};

export default Component;
