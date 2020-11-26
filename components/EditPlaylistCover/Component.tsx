/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Stage,
  Layer,
  Rect,
} from 'react-konva';
import {
  ShapeConfig,
} from 'konva/types/Shape';
import Konva from 'konva';
import { useRouter } from 'next/router';

import Color, { AddOrRemoveColor } from './Color';
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
  SubmenuSections,
  SubmenuSectionButton,
  MainEditSection,
  ColorsWrapper,
  GradientSubSettingWrapper,
} from './Styled';
import { CombinedStateType } from '../../redux/types';
import { updateUserPlaylistCover } from '../../redux/playlists/actions';

interface Props {
  playlistId: string;
}

type MenuSections = 'background' | 'image' | 'text';
type BackgroundSubmenuSections = 'colors' | 'gradient' | 'border';
type ImageSubmenuSections = 'PNG' | 'JPEG' | 'custom';
type TextSubmenuSections = 'style';
type SubmenuSections = BackgroundSubmenuSections | ImageSubmenuSections | TextSubmenuSections;
type GradientSettings = 'none' | 'linear' | 'radial';

const gradientSettings: { [key: string]: {[key: string]: string}} = {
  none: {},
  linear: {
    horizontal: 'Horizontal',
    vertical: 'Vertical',
    diagonalRight: 'Diagonal right',
    diagonalLeft: 'Diagonal left',
  },
  radial: {
    center: 'Center',
    topLeft: 'Top left',
    topRight: 'Top right',
    bottomLeft: 'Bottom left',
    bottomRight: 'Bottom right',
  },
};

const menuSections: {
  [key: string]: Array<
  BackgroundSubmenuSections
  > | Array<
  ImageSubmenuSections
  > | Array<
  TextSubmenuSections
  >;
} = {
  background: [
    'colors',
    'gradient',
    'border',
  ],
  image: [
    'PNG',
    'JPEG',
    'custom',
  ],
  text: [
    'style',
  ],
};

const getCurrentBackgoundProps = (
  bgColors: string[],
  currentGradientSettings: string[],
  canvasWrapperWidth: number,
): ShapeConfig => {
  if (bgColors.length <= 1 || currentGradientSettings[0] === 'none') {
    // eslint-disable-next-line prefer-destructuring
    return {
      fill: bgColors[0],
    };
  } else if (currentGradientSettings[0] === 'linear') {
    const possibleSubSettings = Object.keys(gradientSettings.linear);
    const subSetting = possibleSubSettings.includes(
      currentGradientSettings[1],
    ) ? currentGradientSettings[1] : possibleSubSettings[0];
    return {
      ...getLinearGradientVariants(
        canvasWrapperWidth,
      )[subSetting],
      fillLinearGradientColorStops: getColorStops(bgColors),
    };
  } else if (currentGradientSettings[0] === 'radial') {
    const possibleSubSettings = Object.keys(gradientSettings.radial);
    const subSetting = possibleSubSettings.includes(
      currentGradientSettings[1],
    ) ? currentGradientSettings[1] : possibleSubSettings[0];
    return {
      ...getRadialGradientVariants(
        canvasWrapperWidth,
      )[subSetting],
      fillRadialGradientColorStops: getColorStops(bgColors),
    };
  } else {
    console.warn('This shouldn\'t happen');
    return {};
  }
};

const getGradientSubsetting = (
  currentGradientSetting: string,
  currentGradientSubSetting: string,
): string => {
  const possibleSubSettings = Object.keys(gradientSettings[currentGradientSetting]);
  if (!possibleSubSettings.includes(currentGradientSubSetting)) {
    return Object.keys(gradientSettings[currentGradientSetting])[0];
  }
  return currentGradientSubSetting;
};

const Component: React.FC<Props> = ({ playlistId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [bgColors, setBgColors] = React.useState<string[]>(['#e6e6e6']);
  const [currentMenuSection, setCurrentMenuSection] = React.useState<string>(
    Object.keys(menuSections)[0],
  );
  const [currentSubmenuSecion, setCurrentSubmenuSection] = React.useState<string>(
    menuSections.background[0],
  );
  // the default is random, just so it renders on the server
  // the actual value is 100% of vw-paddings or the max-width of Styled.CanvasWrapper
  const [canvasWrapperWidth, setCanvasWrapperWidth] = React.useState(300);
  const [currentGradientSettings, setCurrentGradientSettings] = React.useState<string[]>(['none', '']);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

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
            { isUpdatingPlaylist ? 'Updating...' : 'Save' }
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
                {...getCurrentBackgoundProps(
                  bgColors,
                  currentGradientSettings,
                  canvasWrapperWidth,
                )}
              />
            </Layer>
          </Stage>
        </CanvasWrapper>

        <SubmenuSections>
          {/* https://stackoverflow.com/a/62296144/10211923 */}
          {(menuSections[currentMenuSection] as string[]).map((subsectionName) => (
            <SubmenuSectionButton
              key={subsectionName}
              isactive={subsectionName === currentSubmenuSecion}
              type="button"
              onClick={(): void => setCurrentSubmenuSection(subsectionName)}
            >
              {subsectionName}
            </SubmenuSectionButton>
          ))}
        </SubmenuSections>

        <MainEditSection>
          {
            // Background -> Colors
            currentSubmenuSecion === menuSections.background[0] ? (
              <ColorsWrapper>
                {/* Color palettes */}
                {bgColors.map((color, i) => (
                  <Color
                    currentColor={color}
                    index={i}
                    setCurrentColor={(newColor, index): void => {
                      setBgColors(
                        bgColors.map(
                          (
                            existingColor,
                            existingIndex,
                          ) => (existingIndex === index ? newColor : existingColor),
                        ),
                      );
                    }}
                  />
                ))}

                {/* Add button */}
                <AddOrRemoveColor
                  addOrRemove="add"
                  handler={(): void => {
                    setBgColors([
                      ...bgColors,
                      // eslint-disable-next-line no-bitwise
                      `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
                    ]);
                    // If adding one more color, check that a gradient will render
                    if (currentGradientSettings[0] === 'none') {
                      setCurrentGradientSettings([
                        'linear',
                        getGradientSubsetting(
                          'linear',
                          currentGradientSettings[1],
                        ),
                      ]);
                    }
                  }}
                />

                {/* Remove button */}
                {
                  bgColors.length >= 2 ? (
                    <AddOrRemoveColor
                      addOrRemove="remove"
                      handler={(): void => {
                        setBgColors(bgColors.filter((val, i) => i !== bgColors.length - 1));
                      }}
                    />
                  ) : null
                }
              </ColorsWrapper>
            )
            // Background -> Gradient
              : currentSubmenuSecion === menuSections.background[1] ? (
                <div style={{
                  display: 'flex',
                }}
                >
                  <div
                    style={{
                      width: '50%',
                    }}
                  >
                    {Object.keys(gradientSettings).map((key) => (
                      <label
                        key={key}
                        htmlFor={key}
                        style={{
                          display: 'block',
                          padding: '5px 0',
                          fontSize: '16px',
                        }}
                      >
                        <input
                          type="radio"
                          id={key}
                          value={key}
                          checked={currentGradientSettings[0] === key}
                          onChange={(): void => setCurrentGradientSettings([
                            key,
                            getGradientSubsetting(
                              key,
                              currentGradientSettings[1],
                            ),
                          ])}
                        />
                        {key}
                      </label>
                    ))}
                  </div>
                  <GradientSubSettingWrapper>
                    {
                      Object.keys(gradientSettings[currentGradientSettings[0]]).map((key) => (
                        <label
                          key={key}
                          htmlFor={key}
                          style={{
                            display: 'block',
                            padding: '5px 0',
                            fontSize: '16px',
                          }}
                        >
                          <input
                            type="radio"
                            id={key}
                            value={key}
                            checked={currentGradientSettings[1] === key}
                            onChange={(): void => setCurrentGradientSettings([
                              currentGradientSettings[0],
                              getGradientSubsetting(
                                currentGradientSettings[0],
                                key,
                              ),
                            ])}
                          />
                          {gradientSettings[currentGradientSettings[0]][key]}
                        </label>
                      ))
                    }
                  </GradientSubSettingWrapper>
                </div>
              ) : currentSubmenuSecion === menuSections.background[2] ? (
                <p>
                  s
                </p>
              ) : currentSubmenuSecion === menuSections.image[0] ? (
                <p>
                  s
                </p>
              ) : currentSubmenuSecion === menuSections.image[1] ? (
                <p>
                  s
                </p>
              ) : currentSubmenuSecion === menuSections.image[2] ? (
                <p>
                  s
                </p>
              ) : currentSubmenuSecion === menuSections.text[0] ? (
                <p>
                  s
                </p>
              ) : null
          }
        </MainEditSection>
      </Body>

      <BottomNav>
        <BottomEditMenus>
          {Object.keys(menuSections).map((section) => (
            <BottomEditMenu
              onClick={(): void => {
                setCurrentMenuSection(section);
                setCurrentSubmenuSection(menuSections[section][0]);
              }}
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
