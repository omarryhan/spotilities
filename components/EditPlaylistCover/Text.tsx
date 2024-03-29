/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { styledComponentsTheme } from '../../configs/theme';

export interface TextProps {
  id: string;
  text: string;
  fontFamily?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderlined?: boolean;
  fontSize?: number;
  color?: string;
  konvaProps?: Konva.TextConfig;
}

interface Props {
  textProps: TextProps;
  isSelected: boolean;
  onSelect: () => void;
  canvasWidth: number;
  onChange: (props: {
    x: number;
    y: number;
  }) => void;
  onDblClick: () => void;
}

const defaultConfig: TextProps = {
  id: '',
  text: 'Enter text',
  fontFamily: 'Proxima Nova',
  isBold: false,
  isItalic: false,
  isUnderlined: false,
  fontSize: 24,
  color: '#0a5809',
  konvaProps: {},
};

export const createNewText = (props: Partial<TextProps>): TextProps => ({
  ...defaultConfig,
  id: Math.random().toString(36).substring(7),
  ...props,
});

const Component: React.FC<Props> = ({
  textProps: {
    id,
    text,
    fontFamily = defaultConfig.fontFamily,
    isBold = defaultConfig.isBold,
    isItalic = defaultConfig.isItalic,
    isUnderlined = defaultConfig.isUnderlined,
    fontSize = defaultConfig.fontSize,
    color = defaultConfig.color,
    konvaProps = defaultConfig.konvaProps,
  },
  onSelect,
  isSelected,
  onChange,
  onDblClick,
}) => {
  const transformerRef = React.useRef<Konva.Transformer>(null);
  const textRef = React.useRef<Konva.Text>(null);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      (transformerRef.current as Konva.Transformer).nodes([
        textRef.current as Konva.Text,
      ]);
      ((transformerRef.current as Konva.Transformer).getLayer() as Konva.Layer).batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        {...konvaProps}
        ref={textRef}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fill={color}
        text={text}
        fontStyle={`${isItalic ? 'italic ' : ''}${isBold ? '800' : ''}`}
        textDecoration={isUnderlined ? 'underline' : ''}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={onSelect}
        onDblClick={onDblClick}
        onDblTap={onDblClick}
        onDragEnd={(e): void => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          anchorStroke={styledComponentsTheme.colors.green.dark}
          anchorFill={styledComponentsTheme.colors.green.primary}
          borderStroke={styledComponentsTheme.colors.gray.darkest}
          ref={transformerRef}
          resizeEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
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
