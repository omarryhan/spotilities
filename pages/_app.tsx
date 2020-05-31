/* eslint-disable react/jsx-props-no-spreading */
import React, { ErrorInfo } from 'react';
import Head from 'next/head';
import App, { AppInitialProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import ReactGA from 'react-ga';

import { wrapper } from '../redux';
import GlobalStyles from '../components/GlobalStyles';
import { styledComponentsTheme } from '../configs/theme';
import { GA_TRACKING_ID, GA_CONFIGS } from '../configs/services';

let isGAInitialized = false;

const initGA = (): void => {
  if (
    typeof window !== 'undefined'
    && !isGAInitialized
  ) {
    ReactGA.initialize(GA_TRACKING_ID, GA_CONFIGS);
    isGAInitialized = true;
  }
};

const onPageView = (): void => {
  if (typeof window !== 'undefined') {
    const location = window.location.pathname + window.location.search;
    ReactGA.set({ page: location });
    ReactGA.pageview(location);
  }
};

interface AppInitialState {
  hasError: boolean;
}

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
  console.log({
    id, name, startTime, value, label,
  });
}


class MyApp extends App<AppInitialProps & CustomAppInitialProps, AppInitialState> {
  public componentDidMount(): void {
    initGA();
    Router.events.on('routeChangeComplete', onPageView);
  }

  // public componentWillUnmount(): void {
  //   initGA();
  //   Router.events.off('routeChangeComplete', onPageView);
  // }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    initGA();
    ReactGA.exception({ stack: error.stack, componentStack: errorInfo.componentStack });
    super.componentDidCatch(error, errorInfo);
  }

  public render(): React.ReactElement {
    const {
      Component, pageProps, err,
    } = this.props;

    return (
      <ThemeProvider theme={styledComponentsTheme}>
        <CssBaseline />
        <GlobalStyles />
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component
          {...pageProps}
          err={err}
        />
      </ThemeProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
