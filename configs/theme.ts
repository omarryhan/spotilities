import { createMuiTheme } from '@material-ui/core/styles';
import { generateMedia } from 'styled-media-query';
import { DefaultTheme } from 'styled-components';

export const materialUITheme = createMuiTheme({
});

export const colors = {
  gray: {
    darkest: 'rgba(4, 4, 4, 1)',
    dark: 'rgba(18, 18, 18, 1)', // #121212
    primary: 'rgba(25, 20, 20, 1)',
    light: 'rgba(40, 40, 40, 1)',
  },
  green: {
    light: 'rgba(40, 108, 71, 1)',
    primary: 'rgba(29, 185, 84, 1)', // #1DB954
  },
  white: {
    primary: 'rgba(255, 255, 255, 1)',
  },
};

export const ZIndeces = {

};

export const BREAKPOINTS = {
  mobileSmall: '20em',
  mobileMedium: '23.438em',
  mobileLarge: '25.875em',
  tablet: '48em',
  laptop: '68.75em',
  laptopLarge: '90em',
  desktop: '160em',
};
export const media = generateMedia(BREAKPOINTS);

export const styledComponentsTheme: DefaultTheme = {
  colors,
};
