import ReactGA from 'react-ga';

export const GA_TRACKING_ID = 'UA-168062109-1';

export const GA_CONFIGS: ReactGA.InitializeOptions = {
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
};

export const SPOTIFY_CLIENT_ID = '5334d5bcc697492eb8b13846199b734b';

export const SPOTIFY_SCOPES_NEEDED = [
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-library-read',
  'user-top-read',
  'user-modify-playback-state',
];
