import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
        font-family: 'Proxima Nova';
        src: url('/fonts/prox.eot');
        src: url('/fonts/prox.woff') format('woff'),
            url('/fonts/prox.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Proxima Thin';
        src: url('/fonts/proxthin.eot');
        src: url('/fonts/proxthin.woff') format('woff'),
            url('/fonts/proxthin.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Proxima Bold';
        src: url('/fonts/proxbold.eot');
        src: url('/fonts/proxbold.woff') format('woff'),
            url('/fonts/proxbold.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
        font-display: swap;
        color: white;
        font-family: Proxima Nova, Georgia, sans-serif;
    }

    html {
        /* font-size: calc(16px + 6 * ((100vw - 320px) / 680)); */
        /* calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
        font-size: calc(16px + (24 - 16) * (100vw - 300px) / (1600 - 300));
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: rgba(18, 18, 18, 1);
    }

    html, body {
        margin: 0;
        padding: 0;
    }
`;
