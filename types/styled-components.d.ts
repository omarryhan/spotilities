import 'styled-components';
import { colors } from '../configs/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
  }
}
