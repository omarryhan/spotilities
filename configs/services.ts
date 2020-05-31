import ReactGA from 'react-ga';

export const GA_TRACKING_ID = 'UA-168062109-1';

export const GA_CONFIGS: ReactGA.InitializeOptions = {
  debug: process.env.NODE_ENV === 'development',
};
