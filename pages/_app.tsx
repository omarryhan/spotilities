/* eslint-disable react/jsx-props-no-spreading */
import React, { ErrorInfo } from 'react';
import Head from 'next/head';
import App, { AppInitialProps } from 'next/app';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { store } from '../redux';
import 'react-awesome-button/dist/styles.css';
import '../components/RecommendButton/react-awesome-button.css';

import GlobalStyles from '../components/GlobalStyles';
import { styledComponentsTheme, materialUITheme } from '../configs/theme';
import { GA_TRACKING_ID, GA_CONFIGS } from '../configs/services';

const initGA = (): void => {
  if (
    typeof window !== 'undefined'
    // @ts-ignore
    && !window.isGAInitialized
  ) {
    ReactGA.initialize(GA_TRACKING_ID, GA_CONFIGS);
    // @ts-ignore
    window.isGAInitialized = true;
  }
};

const onPageView = (): void => {
  if (typeof window !== 'undefined') {
    const location = window.location.pathname + window.location.search;
    ReactGA.set({ page: location });
    ReactGA.pageview(location);
  }
};

interface Metric {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}

interface CustomAppInitialProps {
  err: Error;
}

// Next.JS handles this
// that's why it's not called here
// https://nextjs.org/docs/advanced-features/measuring-performance#web-vitals
export function reportWebVitals({
  id, name, startTime, value, label,
}: Metric): void {
  ReactGA.event({
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    action: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  });
}

class MyApp extends App<AppInitialProps & CustomAppInitialProps> {
  public async componentDidMount(): Promise<void> {
    initGA();
    Router.events.on('routeChangeComplete', onPageView);
  }

  // public componentWillUnmount(): void {
  //   initGA();
  //   Router.events.off('routeChangeComplete', onPageView);
  // }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    initGA();
    ReactGA.exception({
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      isDevEnv: process.env.NODE_ENV === 'development',
    });
    super.componentDidCatch(error, errorInfo);
  }

  public render(): React.ReactElement {
    const {
      Component, pageProps, err,
    } = this.props;

    // https://blog.expo.io/enabling-ios-splash-screens-for-progressive-web-apps-34f06f096e5c
    return (
      <Provider store={store}>
        <MaterialThemeProvider theme={materialUITheme}>
          <StyledThemeProvider theme={styledComponentsTheme}>
            <CssBaseline />
            <GlobalStyles />
            <Head>
              <link rel="shortcut icon" href="/favicon.png" />
              <link rel="manifest" href="/manifest.json" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
              <link rel="apple-touch-startup-image" href="" />
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#282828" />
              <meta name="apple-mobile-web-app-status-bar-style" content="black" />
              <meta name="apple-mobile-webapp-title" content="Spotilities" />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="apple-touch-fullscreen" content="yes" />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta name="msapplication-TileColor" content="#282828" />
              <meta name="title" content="Spotilities | Utilities for Spotify" />
              <meta name="description" content="Spotilities is awesome. Should probably explain more but I'm lazy. Come check it out!" />
              <meta name="keywords" content="Spotify, Spotify Utilities, Spotify Tools" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            </Head>
            <Component
              {...pageProps}
              err={err}
            />
          </StyledThemeProvider>
        </MaterialThemeProvider>
      </Provider>
    );
  }
}

// TODO: Revert to class component
// Only using a function component because I can't access Dispatch from
// the classs component commented out above.
// I tried using this.props.dispatch and this.props.pageProps.dispatch with no luck
// Down sides of using this functional components is that you don't get a full
// componentDidCatch method like above, but resort to a bad hack like I have below
// const MyApp: NextPage<AppInitialProps & CustomAppInitialProps> = (
//   { Component, pageProps, err },
// ) => {
//   React.useEffect(() => {
//     initGA();
//     Router.events.on('routeChangeComplete', onPageView);
//   });
//
//   try {
//     return (
//       <ThemeProvider theme={styledComponentsTheme}>
//         <CssBaseline />
//         <GlobalStyles />
//         <Head>
//           <link rel="shortcut icon" href="/favicon.png" />
//           <link rel="manifest" href="/manifest.json" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//         </Head>
//         <Component
//           {...pageProps}
//           err={err}
//         />
//       </ThemeProvider>
//     );
//   } catch (error) {
//     initGA();
//     ReactGA.exception({ stack: error.stack });
//     throw error;
//   }
// };

export default MyApp;
