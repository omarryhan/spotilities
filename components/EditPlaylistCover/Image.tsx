/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import Konva from 'konva';
import { Box } from 'konva/types/shapes/Transformer';
import { ImageConfig } from 'konva/types/shapes/Image';
import { Layer } from 'konva/types/Layer';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

import { styledComponentsTheme } from '../../configs/theme';

export interface CanvasImage {
  src: string;
  id: string;
  props: ImageConfig;
}

interface Props {
  konvaProps: ImageConfig;
  src: string;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttribs: CanvasImage) => void;
  canvasWidth: number;
  id: string;
}

const Component: React.FC<Props> = ({
  konvaProps,
  src,
  isSelected,
  onSelect,
  onChange,
  canvasWidth,
  id,
}) => {
  const imageRef = React.useRef<Konva.Image>(null);
  const transformerRef = React.useRef<Konva.Transformer>(null);
  const [initialScalingDone, setInitialScalingDone] = React.useState(false);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      (transformerRef.current as Konva.Transformer).nodes([
        imageRef.current as Konva.Image,
      ]);
      (transformerRef.current!.getLayer() as Layer).batchDraw();
    }
  }, [isSelected]);

  const [image, loadingStatus] = useImage(src, 'Anonymous');

  // When first adding the image to the canvas
  // the image should be 75% the width of the canvas
  // regardless of the size of the image
  React.useEffect(() => {
    const node = imageRef.current as Konva.Image;
    const width = node.getWidth();
    if (!initialScalingDone && loadingStatus === 'loaded' && width) {
      node.scaleX((canvasWidth / width) * 0.75);
      node.scaleY((canvasWidth / width) * 0.75);
      setInitialScalingDone(true);
    }
  }, [
    setInitialScalingDone,
    canvasWidth,
    initialScalingDone,
    loadingStatus,
  ]);

  return (
    <>
      <Image
        // It is important to keep "...konvaProps" at the top
        // So that it doesn't override the image prop with undefined.
        {...konvaProps}
        image={image}
        onClick={onSelect}
        onTap={onSelect}
        ref={imageRef}
        onDragEnd={(e): void => {
          onChange({
            src,
            props: {
              ...konvaProps,
              x: e.target.x(),
              y: e.target.y(),
            },
            id,
          });
        }}
        onDragStart={onSelect}
        // This was copied from the example by Anton (Konva's author)
        // from here:
        // https://konvajs.org/docs/react/Transformer.html
        // I commented out this function because I am not sure I undestand
        // its purpose. And it was actually making the scaling function
        // a bit buggy. (After scaling, sometimes the pictures move away from
        // their end position). The comments in this event handler is by Anton.
        onTransformEnd={(e): void => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end

          // const node = imageRef.current as Konva.Image;
          // const scaleX = node.scaleX();
          // const scaleY = node.scaleY();

          // we will reset it back
          // node.scaleX(1);
          // node.scaleY(1);
          // onChange({
          //   src,
          //   props: {
          //     ...konvaProps,
          //     x: node.x(),
          //     y: node.y(),
          //     // set minimal value
          //     width: Math.max(node.width() * scaleX),
          //     height: Math.max(node.height() * scaleY),
          //   },
          // });
        }}
        // I will use offset to set origin to the center of the image
        offsetX={image ? image.width / 2 : 0}
        offsetY={image ? image.height / 2 : 0}
        draggable
      />
      {isSelected && (
        <Transformer
          anchorStroke={styledComponentsTheme.colors.green.dark}
          anchorFill={styledComponentsTheme.colors.green.primary}
          borderStroke={styledComponentsTheme.colors.gray.darkest}
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox): Box => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Component;
