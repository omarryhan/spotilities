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

import GlobalStyles from '../components/GlobalStyles';
import { styledComponentsTheme, materialUITheme } from '../configs/theme';
import { GA_TRACKING_ID, GA_CONFIGS } from '../configs/services';

const initGA = (): void => {
  if (
    typeof window !== 'undefined'
    // @ts-expect-error mehh
    && !window.isGAInitialized
  ) {
    ReactGA.initialize(GA_TRACKING_ID, GA_CONFIGS);
    // @ts-expect-error mehh
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

  // not sure if this is needed
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
    if (super.componentDidCatch) {
      super.componentDidCatch(error, errorInfo);
    }
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
              {/* Cool web standards */}
              <meta name="title" content="Spotilities | Spotilities is a Spotify client with magic powers." />
              <meta name="description" content="Spotilities is an alternative Spotify client with unique features like: Generating recommendations fitting to attributes that you choose. View your top tracks and artists in 1 month, 3 months and of all time, and many more. Come check it out!" />
              <meta name="keywords" content="Spotify, Spotify Utilities, Spotify Tools, Spotify Client, Spotify PWA, Spotify recommend, Recommend music" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
              <link rel="shortcut icon" href="/favicon.png" />
              <meta name="theme-color" content="#121212" />
              <link rel="icon" type="image/png" sizes="192x192" href="/icons/logo/192w/logo3manifest-small.png" />
              <link rel="icon" type="image/png" sizes="265x265" href="/icons/logo/256w/logo3manifest-medium.png" />
              <link rel="icon" type="image/png" sizes="512x512" href="/icons/logo/512w/logo3manifest-big.png" />
              <link rel="manifest" href="/manifest.json" />

              {/* Apple stuff.. yuk */}
              <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
              <link rel="apple-touch-startup-image" href="" />
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#121212" />
              <meta name="apple-mobile-web-app-status-bar-style" content="black" />
              <meta name="apple-mobile-webapp-title" content="Spotilities" />
              <meta name="apple-touch-fullscreen" content="yes" />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="application-name" content="Spotilities" />

              {/* MS stuff.. yuk */}
              <meta name="msapplication-TileColor" content="#121212" />
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

export default MyApp;
