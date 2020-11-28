/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Stage,
  Layer,
  Rect,
  Line,
} from 'react-konva';
import Konva from 'konva';
import { useRouter } from 'next/router';
import Slider from '@material-ui/core/Slider';

import { searchPixabay, PixabayHit } from './pixabayAPI';
import Color, { AddOrRemoveColor } from './Color';
import PixabayForm from './PixabayForm';
import ImageRoll from './ImageRoll';
import Image, { CanvasImage } from './Image';
import {
  getCurrentBackgoundProps,
  getGradientSubsetting,
  gradientSettings,
} from './config/gradient';
import { menuSections } from './config/menu';
import DeleteIcon from '../../public/icons/delete.svg';
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
  DeleteButton,
} from './Styled';
import { CombinedStateType } from '../../redux/types';
import { updateUserPlaylistCover } from '../../redux/playlists/actions';

interface Props {
  playlistId: string;
}

const Component: React.FC<Props> = ({ playlistId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  /** ************* Menu and submenu *********** */
  const [currentMenuSection, setCurrentMenuSection] = React.useState<string>(
    Object.keys(menuSections)[0],
  );
  const [currentSubmenuSecion, setCurrentSubmenuSection] = React.useState<string>(
    menuSections.background[0],
  );

  /** ************* Canvas *********** */
  const [canvasImages, setCanvasImages] = React.useState<CanvasImage[]>([]);
  const [selectedId, selectShape] = React.useState<string | null>(null);
  const [canvasWrapperWidth, setCanvasWrapperWidth] = React.useState(300);

  /** ************* Background *********** */
  const defaultBgColor = '#e6e6e6';
  const [bgColors, setBgColors] = React.useState<string[]>([defaultBgColor]);
  // the default is random, just so it renders on the server
  // the actual value is 100% of vw-paddings or the max-width of Styled.CanvasWrapper
  const [currentGradientSettings, setCurrentGradientSettings] = React.useState<string[]>(['none', '']);
  const [{ strokeColor, strokeWidth }, setCanvasBorder] = React.useState<
  {strokeColor: string; strokeWidth: number}
  >({ strokeColor: '#e6e6e6', strokeWidth: 0 });

  /** ************* Pixabay form *********** */
  const [pixabayPage, setPixabayPage] = React.useState<number>(1);
  const [isSearchingPixabay, setIsSearchingPixabay] = React.useState(false);
  // for pagination
  const [lastSearchQuery, setLastPageQuery] = React.useState<string>('');
  const [currentPixabayHits, setCurrentPixabayHits] = React.useState<PixabayHit[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const imageDragUrl = React.useRef<string>(null);

  const isUpdatingPlaylist = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.status.isUpdating,
  );

  const getNewPixabayPage = async (): Promise<void> => {
    setIsSearchingPixabay(true);
    try {
      const response = await searchPixabay(
        { q: lastSearchQuery, page: pixabayPage + 1 },
      );
      setPixabayPage(pixabayPage + 1);
      setCurrentPixabayHits([
        ...currentPixabayHits,
        ...response.hits,
      ]);
    } finally {
      setIsSearchingPixabay(false);
    }
  };

  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>): void => {
    // deselect when clicked on empty area
    selectShape(null);
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const onDeleteSelectedCanvasItem = (): void => {
    selectShape(null);
    setCanvasImages(
      canvasImages.filter((image) => image.id !== selectedId),
    );
  };

  const handleBeforeUnload = (e: BeforeUnloadEvent): string => {
    const confirmationMessage = 'You have unsaved changes. Discard?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    const dirtyCanvasState = bgColors.length !== 1
      || bgColors[0] !== defaultBgColor || canvasImages.length;

    if (!dirtyCanvasState) {
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

  useEffect(() => {
    setCanvasWrapperWidth((wrapperRef.current as HTMLDivElement).clientWidth);
  }, []);

  return (
    <>
      <Body>
        <TopBar>
          <DeleteButton
            disabled={selectedId === null}
            title="Delete selected item"
            type="button"
            onClick={onDeleteSelectedCanvasItem}
          >
            <DeleteIcon />
          </DeleteButton>
          <SubmitButton
            onClick={async (): Promise<void> => {
              // deselect any selection, so that it doesn't appear in the end result.
              selectShape(null);
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

        <CanvasWrapper
          ref={wrapperRef}
          onDrop={(e): void => {
            e.preventDefault();
            // register event position
            (stageRef.current as Konva.Stage).setPointersPositions(e);
            // add image
            setCanvasImages([
              ...canvasImages,
              {
                props: {
                  ...(stageRef.current as Konva.Stage).getPointerPosition() || {},
                  image: undefined, // Only here to not break the typings
                },
                src: imageDragUrl.current as string,
                id: Math.random().toString(36).substring(7),
              },
            ]);
            // Open transformer once added
            selectShape(`${canvasImages.length}-${imageDragUrl.current}`);
          }}
          onDragOver={(e): void => e.preventDefault()}
        >
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
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
              />
            </Layer>
            <Layer>
              {canvasImages.map((image, i) => (
                <Image
                  konvaProps={image.props}
                  src={image.src}
                  // eslint-disable-next-line react/no-array-index-key
                  key={image.id}
                  isSelected={image.id === selectedId}
                  onSelect={(): void => {
                    selectShape(image.id);
                  }}
                  onChange={(newAttrs): void => {
                    const newCanvasImages = canvasImages.slice();
                    newCanvasImages[i] = newAttrs;
                    setCanvasImages(newCanvasImages);
                  }}
                  canvasWidth={canvasWrapperWidth}
                  id={image.id}
                />
              ))}
            </Layer>
            <Layer>
              <Line
                // X1, Y1, X2, Y2 etc.
                points={[
                  0, 0,
                  canvasWrapperWidth, 0,
                  canvasWrapperWidth, canvasWrapperWidth,
                  0, canvasWrapperWidth,
                ]}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                // Deselect here as well
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
              />
              <Line
                // This is a hack.
                // We can just pass a "closed" property to the `Line` above
                // to achieve a proper canvas border. But that will not make the
                // click event propogate to other elements because when a line is
                // `closed`, it occupies all what's inside the closure.
                points={[
                  0, 0,
                  0, canvasWrapperWidth,
                ]}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
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
                {bgColors.map((bgColor, i) => (
                  <Color
                    currentColor={bgColor}
                    index={i}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${bgColor}${i}`}
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
                          textTransform: 'capitalize',
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
                <div style={{
                  display: 'flex',
                }}
                >
                  <div
                    style={{ width: '30%' }}
                  >
                    <Color
                      currentColor={strokeColor}
                      index={0}
                      setCurrentColor={(newColor): void => setCanvasBorder({
                        strokeColor: newColor,
                        strokeWidth,
                      })}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    width: '70%',
                    paddingRight: '20px',
                  }}
                  >
                    <p style={{
                      margin: '3px 15px 0 0',
                      fontSize: '16px',
                    }}
                    >
                      Size:
                    </p>

                    <Slider
                      value={strokeWidth}
                      onChange={(e, newValue): void => setCanvasBorder({
                        strokeColor,
                        strokeWidth: newValue as number,
                      })}
                      min={0}
                      max={canvasWrapperWidth}
                      marks
                    />
                  </div>
                </div>
              ) : currentSubmenuSecion === menuSections.image[0] ? (
                <div>
                  <PixabayForm
                    isSearchingPixabay={isSearchingPixabay}
                    setIsSearchingPixabay={setIsSearchingPixabay}
                    setCurrentPixabayHits={setCurrentPixabayHits}
                    setLastPageQuery={setLastPageQuery}
                  />
                  <ImageRoll
                    hits={currentPixabayHits}
                    requestOneMorePage={(): Promise<void> => getNewPixabayPage()}
                    imageDragUrl={imageDragUrl}
                    onImgClick={(src): void => {
                      const id = Math.random().toString(36).substring(7);
                      setCanvasImages([
                        ...canvasImages,
                        {
                          props: {
                            x: canvasWrapperWidth / 2,
                            y: canvasWrapperWidth / 2,
                            // ...(stageRef.current as Konva.Stage).getPointerPosition() || {},
                            image: undefined, // Only here to not break the typings
                          },
                          src,
                          id,
                        },
                      ]);
                      selectShape(id);
                    }}
                  />
                </div>
              ) : currentSubmenuSecion === menuSections.image[1] ? (
                <p>
                  Custom image
                </p>
              ) : currentSubmenuSecion === menuSections.text[0] ? (
                <p>
                  Text
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
