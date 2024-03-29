/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
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
import Color, { AddOrRemoveButton } from './Color';
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
import CustomUpload from './CustomUpload';
import { Input as TextInputForm } from '../EditPlaylistInfo/Styled';
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
import Text, { TextProps, createNewText } from './Text';
import SelectFontFamily from './SelectFontFamily';

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

  /** ************* API *********** */
  const [doUpdateUserPlaylistCover, setDoUpdateUserPlaylistCover] = useState(false);
  const isUpdatingPlaylist = useSelector<CombinedStateType, boolean>(
    (state) => state.playlists.status.isUpdating,
  );
  const playlistName = useSelector<CombinedStateType, string>(
    (state) => state.playlists.data[playlistId]?.name,
  );

  /** ************* Background *********** */
  const defaultBgColor = '#e6e6e6';
  const [bgColors, setBgColors] = React.useState<string[]>([defaultBgColor]);
  // the default is random, just so it renders on the server
  // the actual value is 100% of vw-paddings or the max-width of Styled.CanvasWrapper
  const [currentGradientSettings, setCurrentGradientSettings] = React.useState<string[]>(['none', '']);
  const [{ strokeColor, strokeWidth }, setCanvasBorder] = React.useState<
  { strokeColor: string; strokeWidth: number }
  >({ strokeColor: '#1DB954', strokeWidth: 0 });

  /** ************* Pixabay form *********** */
  const [pixabayPage, setPixabayPage] = React.useState<number>(1);
  const [isSearchingPixabay, setIsSearchingPixabay] = React.useState(false);
  // for pagination
  const [lastSearchQuery, setLastPageQuery] = React.useState<string>('');
  const [currentPixabayHits, setCurrentPixabayHits] = React.useState<PixabayHit[]>([]);

  /** ************* Text *********** */
  const [currentText, setCurrentText] = React.useState<TextProps[]>([]);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const selectedTextItem_ = currentText.filter(
    (text) => text.id === selectedId,
  );
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const selectedTextItem = selectedId === null ? '' : selectedTextItem_.length ? selectedTextItem_[0] : '';
  const currentFontFamily = !selectedTextItem ? '' : selectedTextItem.fontFamily;
  const setCurrentTextProp = (object: Partial<TextProps>): void => {
    if (!selectedTextItem) {
      return;
    }

    setCurrentText([
      ...currentText.filter((currentText_) => currentText_.id !== selectedTextItem.id),
      {
        ...selectedTextItem,
        ...object,
      },
    ]);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const imageDragUrl = React.useRef<string>(null);
  const textInputRef = React.useRef<HTMLInputElement>(null);

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
    const selectedShapeId = selectedId;
    if (selectedTextItem && selectedShapeId === selectedTextItem.id) {
      setCurrentText(currentText.filter((text) => text.id !== selectedTextItem.id));
    } else if (selectedShapeId !== null) {
      selectShape(null);
      setCanvasImages(
        canvasImages.filter((image) => image.id !== selectedShapeId),
      );
    }
  };

  const handleBeforeUnload = (e: BeforeUnloadEvent): string => {
    const confirmationMessage = 'You have unsaved changes. Discard?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  const canvasIsDirty = bgColors.length !== 1
  // should add border too
  || bgColors[0] !== defaultBgColor || canvasImages.length || currentText.length;

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

  useEffect(() => {
    setCanvasWrapperWidth((wrapperRef.current as HTMLDivElement).clientWidth);
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      if (e.keyCode === 46 || e.key === 'Delete') {
        // FIX: This keeps deleting all images, not just the selected one.. very weird.
        // onDeleteSelectedCanvasItem();
      }
    };

    document.addEventListener('keydown', listener);

    return (): void => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  useEffect(() => {
    const effect = async (): Promise<void> => {
      await dispatch(updateUserPlaylistCover({
        id: playlistId,
        img: (stageRef.current as Konva.Stage).toDataURL().split(',')[1],
        router,
      }));
    };

    if (doUpdateUserPlaylistCover) {
      try {
        effect();
      } finally {
        setDoUpdateUserPlaylistCover(false);
      }
    }
  }, [
    doUpdateUserPlaylistCover,
    setDoUpdateUserPlaylistCover,
    dispatch,
    playlistId,
    router,
  ]);

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
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-download"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              style={{
                marginRight: '10px',
              }}
              onClick={(): void => {
                if (!canvasIsDirty) {
                  return undefined;
                }
                const url = (stageRef.current as Konva.Stage).toDataURL({ pixelRatio: 5 });
                const link = document.createElement('a');
                link.download = `${playlistName} - album cover`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // delete link;
                return undefined;
              }}
              stroke={canvasIsDirty ? '#fff' : 'rgb(100, 100, 100)'}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <polyline points="7 11 12 16 17 11" />
              <line x1="12" y1="4" x2="12" y2="16" />
            </svg>
            <SubmitButton
            // It seems that deselecting the shape is done asynchronously. Probably from React.
            // So, we're doing this hack to make sure that Konva's transformer isn't
            // visible in the uploaded image.
            // The hack:
            // https://stackoverflow.com/questions/53898810/executing-async-code-on-update-of-state-with-react-hooks
              onClick={async (): Promise<void> => {
              // deselect any selection, so that it doesn't appear in the end result.
                selectShape(null);
                setDoUpdateUserPlaylistCover(true);
              }}
              disabled={isUpdatingPlaylist}
            >
              { isUpdatingPlaylist ? 'Updating...' : 'Update' }
            </SubmitButton>
          </div>
        </TopBar>

        <CanvasWrapper
          ref={wrapperRef}
          onDrop={(e): void => {
            const id = Math.random().toString(36).substring(7);
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
                id,
              },
            ]);
            // Open transformer once added
            selectShape(id);
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
              {currentText.map((text, i) => (
                <Text
                  textProps={text}
                  key={text.id}
                  isSelected={selectedId !== null && text.id === selectedId}
                  onSelect={(): void => {
                    setCurrentMenuSection('text');
                    currentSubmenuSecion !== 'content' && currentSubmenuSecion !== 'style' && setCurrentSubmenuSection('content');
                    selectShape(text.id);
                  }}
                  canvasWidth={canvasWrapperWidth}
                  onChange={({ x, y }): void => {
                    const newCurrentText = currentText.slice();
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    newCurrentText[i]!.konvaProps!.x = x;
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    newCurrentText[i]!.konvaProps!.y = y;
                    setCurrentText(newCurrentText);
                  }}
                  onDblClick={(): void => {
                    setCurrentMenuSection('text');
                    setCurrentSubmenuSection('content');
                    (textInputRef.current as HTMLInputElement).select();
                  }}
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
                <div style={{ marginRight: '40px' }}>
                  <AddOrRemoveButton
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
                </div>

                {/* Remove button */}
                {
                  bgColors.length >= 2 ? (
                    <div style={{ marginRight: '40px' }}>
                      <AddOrRemoveButton
                        addOrRemove="remove"
                        handler={(): void => {
                          setBgColors(bgColors.filter((val, i) => i !== bgColors.length - 1));
                        }}
                      />
                    </div>
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
                <CustomUpload
                  onUpload={(src: string): void => {
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
              ) : currentSubmenuSecion === menuSections.text[0] ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: '10px',
                    marginRight: '20px',
                  }}
                  >
                    <AddOrRemoveButton
                      addOrRemove="add"
                      handler={(): void => {
                        const newText = createNewText({
                          text: playlistName,
                        });
                        newText.konvaProps = {
                          x: 10,
                          y: canvasWrapperWidth / 2,
                        };
                        setCurrentText([
                          ...currentText,
                          newText,
                        ]);
                        selectShape(newText.id);
                      }}
                    />
                  </div>
                  {
                    // if currently a text item is selected, show the input element
                    selectedTextItem ? (
                      <div style={{
                        width: '100%',
                      }}
                      >
                        <TextInputForm
                          name="Input text"
                          placeholder="Enter text"
                          ref={textInputRef}
                          type="text"
                          onFocus={(e): void => e.target.select()}
                          id="inputText"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            const newSelectedItem = {
                              ...selectedTextItem,
                              text: e.target.value,
                            };
                            setCurrentText([
                              // add all the ones that aren't the one the user is editing
                              ...currentText.filter(
                                (text) => text.id !== newSelectedItem.id,
                              ),
                              newSelectedItem,
                            ]);
                          }}
                          value={selectedTextItem.text}
                        />
                      </div>
                    ) : null
                  }
                </div>
              ) : currentSubmenuSecion === menuSections.text[1] ? (
                <div>
                  {!selectedTextItem
                    ? (
                      <p style={{ fontSize: '16px' }}>
                        Please select or add a text to be able to edit
                      </p>
                    ) : (
                      <div>
                        <div>
                          <div style={{
                            display: 'flex',
                          }}
                          >
                            <div>
                              <Color
                                disabled={!selectedTextItem}
                                currentColor={selectedTextItem ? selectedTextItem.color as string : '#fff'}
                                setCurrentColor={(newColor): void => {
                                  if (selectedTextItem) {
                                    selectedTextItem.color = newColor;
                                    setCurrentText([
                                    // add all the ones that aren't the one the user is editing
                                      ...currentText.filter(
                                        (text) => text.id !== (selectedTextItem as TextProps).id,
                                      ),
                                      selectedTextItem,
                                    ]);
                                  }
                                }}
                              />
                            </div>
                            <div style={{
                              display: 'flex',
                              paddingRight: '20px',
                              flex: '1',
                              alignItems: 'center',
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
                                value={selectedTextItem ? selectedTextItem.fontSize : 0}
                                onChange={(e, newValue): void => {
                                  if (selectedTextItem) {
                                    selectedTextItem.fontSize = newValue as number;
                                    setCurrentText([
                                    // add all the ones that aren't the one the user is editing
                                      ...currentText.filter(
                                        (text) => text.id !== (selectedTextItem as TextProps).id,
                                      ),
                                      selectedTextItem,
                                    ]);
                                  }
                                }}
                                min={10}
                                max={300}
                                marks
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          paddingTop: '30px',
                        }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}
                          >
                            <SelectFontFamily
                              disabled={!selectedTextItem}
                              currentFontFamily={currentFontFamily || ''}
                              setCurrentFontFamily={
                                (family: string): void => setCurrentTextProp({ fontFamily: family })
                              }
                              onSelect={(): void => {
                                setTimeout(() => {
                                // Trigger a rerender so that the font updates
                                // after the new font has been downloaded
                                  const currentShape = selectedId;
                                  selectShape(null);
                                  selectShape(currentShape);
                                }, 1500);
                              }}
                            />
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-labelledby="Bold"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                style={{
                                  marginLeft: '-4px',
                                  marginRight: '6px',
                                }}
                                strokeWidth="1.5"
                                stroke={!selectedTextItem ? '' : selectedTextItem.isBold ? '#fff' : 'rgb(100, 100, 100)'}
                                onClick={(): void => {
                                  setCurrentTextProp({
                                    isBold: !selectedTextItem ? false : !selectedTextItem.isBold,
                                  });
                                }}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
                                <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-labelledby="Italic"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                style={{
                                  marginLeft: '-4px',
                                  marginRight: '6px',
                                }}
                                strokeWidth="1.5"
                                stroke={!selectedTextItem ? '' : selectedTextItem.isItalic ? '#fff' : 'rgb(100, 100, 100)'}
                                onClick={(): void => {
                                  setCurrentTextProp({
                                    isItalic: !selectedTextItem
                                      ? false
                                      : !selectedTextItem.isItalic,
                                  });
                                }}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="11" y1="5" x2="17" y2="5" />
                                <line x1="7" y1="19" x2="13" y2="19" />
                                <line x1="14" y1="5" x2="10" y2="19" />
                              </svg>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-labelledby="Underline"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                style={{
                                  marginLeft: '-4px',
                                  marginRight: '6px',
                                }}
                                strokeWidth="1.5"
                                stroke={!selectedTextItem ? '' : selectedTextItem.isUnderlined ? '#fff' : 'rgb(100, 100, 100)'}
                                onClick={(): void => {
                                  setCurrentTextProp({
                                    isUnderlined: !selectedTextItem
                                      ? false : !selectedTextItem.isUnderlined,
                                  });
                                }}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="6" y1="20" x2="18" y2="20" />
                                <path d="M8 5v6a4 4 0 0 0 8 0v-6" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
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
