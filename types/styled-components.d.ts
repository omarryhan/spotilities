import 'styled-components';
import {
  colors, zIndeces, dimensions, breakpoints,
} from '../configs/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    dimensions: typeof dimensions;
    zIndeces: typeof zIndeces;
    breakpoints: typeof breakpoints;
  }
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}
