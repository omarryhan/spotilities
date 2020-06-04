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
      </ThemeProvider>
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

export default wrapper.withRedux(MyApp);
