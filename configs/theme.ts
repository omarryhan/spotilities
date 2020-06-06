import { createMuiTheme } from '@material-ui/core/styles';
import { generateMedia } from 'styled-media-query';
import { DefaultTheme } from 'styled-components';

export const colors = {
  gray: {
    darkest: 'rgba(4, 4, 4, 1)',
    dark: 'rgba(18, 18, 18, 1)', // #121212
    primary: 'rgba(25, 20, 20, 1)',
    light: 'rgba(40, 40, 40, 1)',
    lighter: 'rgba(50, 50, 50, 1)',
    lightest: 'rgba(60, 60, 60, 1)',
    evenLighter: 'rgba(70, 70, 70, 1)',
    evenLightest: 'rgba(80, 80, 80, 1)',
  },
  green: {
    light: 'rgba(40, 108, 71, 1)',
    lightest: 'rgba(0, 224, 37, 1)',
    primary: 'rgba(29, 185, 84, 1)', // #1DB954
  },
  white: {
    primary: 'rgba(255, 255, 255, 1)',
    lightest: 'rgba(255, 255, 255, 1)',
    lighter: 'rgb(245, 245, 245, 1)',
    light: 'rgb(235, 235, 235, 1)',
    dark: 'rgb(225, 225, 225, 1)',
    darker: 'rgb(215, 215, 215, 1)',
    darkest: 'rgb(205, 205, 205, 1)',
    evenDarker: 'rgb(180, 180, 180, 1)',
    evenDarkest: 'rgb(150, 150, 150, 1)',
  },
};

export const dimensions = {
  contentSideMargin: {
    mobile: '10px',
    desktop: '20px',
  },
  headerHeight: {
    mobile: '35px',
    desktop: '35px',
  },
  bottomAppBarHeight: {
    mobile: '60px',
    desktop: '60px',
  },
};

export const zIndeces = {
  header: '10',
  footer: '10',
};

export const breakpoints = {
  mobileSmall: '20em',
  mobileMedium: '23.438em',
  mobileLarge: '25.875em',
  tablet: '48em',
  laptop: '68.75em',
  laptopLarge: '90em',
  desktop: '160em',
};

export const styledComponentsTheme: DefaultTheme = {
  colors,
  dimensions,
  zIndeces,
};


export const materialUITheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.green.primary,
    },
    secondary: {
      main: styledComponentsTheme.colors.green.primary,
    },
  },
});

export const media = generateMedia<typeof breakpoints, DefaultTheme>(breakpoints);
