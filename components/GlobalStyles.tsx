import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    box-sizing: border-box;
    font-display: swap;
    background-color: ${(props): string => props.theme.colors.gray.dark};
    color: white;
}

html {
    /* font-size: calc(16px + 6 * ((100vw - 320px) / 680)); */
    /* calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
    font-size: calc(16px + (24 - 16) * (100vw - 300px) / (1600 - 300));
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

html, body {
    margin: 0;
    padding: 0;
}`;
