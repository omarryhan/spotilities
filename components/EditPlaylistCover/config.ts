import {
  ShapeConfig,
} from 'konva/types/Shape';

/* Given ['blue', 'red'] should return [0, 'blue', 1, 'red']
   Given ['blue', 'red', 'green'] should return [0, 'blue', 0.5, 'red', 1, 'green']
   Given ['blue'] should return [0, 'blue']
   Spreads them evenly for simplicity.
*/
export const getColorStops = (colors: string[]): Array<number | string> => {
  const len = colors.length;
  if (len === 0) {
    return [];
  } else if (len === 1) {
    return [0, colors[0]];
  } else if (len === 2) {
    return [0, colors[0], 1, colors[1]];
  }

  const stops: number[] = [
    0,
    ...Array(len - 2).fill(1 / (len - 1)).map(
      (val, index) => val * (index + 1),
    ),
    1,
  ];

  const retval: Array<number | string> = [];
  stops.forEach((val, index) => retval.push(val, colors[index]));
  return retval;
};

export const getLinearGradientVariants = (width: number): {[key: string]: ShapeConfig} => ({
  horizontal: {
    fillLinearGradientStartPoint: { x: 0, y: width / 2 },
    fillLinearGradientEndPoint: { x: width, y: width / 2 },
  },
  vertical: {
    fillLinearGradientStartPoint: { x: width / 2, y: 0 },
    fillLinearGradientEndPoint: { x: width / 2, y: width },
  },
  diagonalRight: {
    fillLinearGradientStartPoint: { x: 0, y: 0 },
    fillLinearGradientEndPoint: { x: width, y: width },
  },
  diagonalLeft: {
    fillLinearGradientStartPoint: { x: width, y: 0 },
    fillLinearGradientEndPoint: { x: 0, y: width },
  },
});

export const getRadialGradientVariants = (width: number): {[key: string]: ShapeConfig} => ({
  center: {
    fillRadialGradientStartPoint: { x: (width / 2), y: (width / 2) },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: { x: (width / 2), y: (width / 2) },
    fillRadialGradientEndRadius: width / 2,
  },
  topLeft: {
    fillRadialGradientStartPoint: { x: 0, y: 0 },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: { x: 0, y: 0 },
    fillRadialGradientEndRadius: width,
  },
  topRight: {
    fillRadialGradientStartPoint: { x: width, y: 0 },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: { x: width, y: 0 },
    fillRadialGradientEndRadius: width,
  },
  bottomLeft: {
    fillRadialGradientStartPoint: { x: 0, y: width },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: { x: 0, y: width },
    fillRadialGradientEndRadius: width,
  },
  bottomRight: {
    fillRadialGradientStartPoint: { x: width, y: width },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: { x: width, y: width },
    fillRadialGradientEndRadius: width,
  },
});
