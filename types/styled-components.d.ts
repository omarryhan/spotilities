import 'styled-components';
import { colors, zIndeces, dimensions } from '../configs/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    dimensions: typeof dimensions;
    zIndeces: typeof zIndeces;
  }
}
