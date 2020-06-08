import ReactGA from 'react-ga';

export const GA_TRACKING_ID = 'UA-168062109-1';

export const GA_CONFIGS: ReactGA.InitializeOptions = {
  debug: process.env.NODE_ENV === 'development',
};

export const SPOTIFY_CLIENT_ID = '5334d5bcc697492eb8b13846199b734b';

export const SPOTIFY_SCOPES_NEEDED = [
  'user-read-private',
  'user-read-email',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'user-read-recently-played',
  'user-follow-read',
  'user-read-playback-state',
  'user-modify-playback-state',
];
