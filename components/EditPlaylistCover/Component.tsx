/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Stage,
  Layer,
  Text,
  Rect,
} from 'react-konva';
import Konva from 'konva';
import { useRouter } from 'next/router';

import {
  getLinearGradientVariants,
  getRadialGradientVariants,
  getColorStops,
} from './config';
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
import { updateUserPlaylistCover } from '../../redux/playlists/actions';

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
  const [bgColors, setBgColors] = React.useState<string[]>(['#fff']);
  const [currentMenuSection, setCurrentMenuSection] = React.useState<MenuSections>(menuSections[0]);
  const [canvasWrapperWidth, setCanvasWrapperWidth] = React.useState(300); // 300 is random

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const isUpdatingPlaylist = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.status.isUpdating,
  );

  useEffect(() => {
    setCanvasWrapperWidth((wrapperRef.current as HTMLDivElement).clientWidth);
  }, []);

  return (
    <>
      <Body>
        <TopBar>
          <div />
          <SubmitButton
            onClick={async (): Promise<void> => {
              await dispatch(updateUserPlaylistCover({
                id: playlistId,
                img: (stageRef.current as Konva.Stage).toDataURL().split(',')[1],
                router,
              }));
            }}
            disabled={isUpdatingPlaylist}
          >
            { isUpdatingPlaylist ? 'Updating...' : 'Save'}
          </SubmitButton>
        </TopBar>

        <CanvasWrapper ref={wrapperRef}>
          <Stage
            width={canvasWrapperWidth}
            height={canvasWrapperWidth}
            ref={stageRef}
          >
            <Layer>
              <Rect
                width={canvasWrapperWidth}
                height={canvasWrapperWidth}
                // {...getLinearGradientVariants(canvasWrapperWidth).horizontal}
                // fillLinearGradientColorStops={getColorStops(bgColors)}
                {...getRadialGradientVariants(canvasWrapperWidth).bottomRight}
                fillRadialGradientColorStops={getColorStops(bgColors)}
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
              isactive={section === currentMenuSection}
              key={section}
            >
              <p>
                {section}
              </p>
              <BottomEditMenuStatus isactive={section === currentMenuSection} />
            </BottomEditMenu>
          ))}
        </BottomEditMenus>
      </BottomNav>
    </>
  );
};

export default Component;
