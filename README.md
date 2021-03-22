<p align="center">
  <img src="https://github.com/omarryhan/spotilities/raw/master/public/icons/logo/512w/logo3manifest-big.png" alt="Logo" title="Spotilities" height="250" width="250"/>
  <p align="center">
    <a href="https://github.com/omarryhan/spotilities/actions?query=workflow%3ACI"><img alt="Build Status" src="https://github.com/omarryhan/spotilities/workflows/CI/badge.svg"></a>
    <a href="https://app.netlify.com/sites/spotilities/deploys"><img alt="Build status" src="https://api.netlify.com/api/v1/badges/8c0737ed-4b8a-4bb2-b61c-524085f59961/deploy-status"></a>
    <a href="https://github.com/omarryhan/spotilities"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
  </p>
</p>

# Spotilities

Spotilities is your swiss army knife for Spotify.

## Preview

![Preview](https://media.giphy.com/media/Pk9umkY5wUR4QRF3w0/giphy.gif)

## Goals

Complement Spotify's official mobile app and not replace it.

## Why I made it

I wanted to test out the song-analysis endpoints provided by Spotify through their API.
Stuff like: song's energy, danceability etc. Unfortunately, the official Spotify web app doesn't show you these stats.
Also, there used to be an app on the PlayStore that I used to use to check my top tracks and artists. It was abruptly removed for a reason I don't know, so I thought I might add these features as well.
A couple of months later, I wanted to try working with HTML canvas to prepare for a larger commercial project. So I thought, it might be nice to have a playlist cover creator right in the app. That's probably going to be the last major feature. But who knows.. maybe something else might popup, so stay tuned.

## Todo

- [x] Show top tracks and top artists for 1 month, 3 months and of all time.
- [x] Show the stats of your tracks and playlists.
- [x] Generate recommendations using Spotify's stats.
- [x] Edit playlist description
- [x] Create your own playlist cover art and upload it.
- [x] Make a very simple landing page so that users aren't automatically redirected to Spotify's login page once they visit the website.
- [ ] Add the generated recommendations to a new playlist (currently you can only add the results to the queue).
- [ ] Ability to sort playlist by attribute


## Live version

https://spotilities.netlify.app/

**Tip:**

For optimal experience, use the website from your phone.

To install it as an app, after opening the website, open your browser's menu and click on **"Add to homescreen"**. Et voila, it's now an app on your phone.

## Features

**1. Generate track recommendations based on:**

- Seed tracks
- Tunable attributes:
  - Acousticness
  - Danceability
  - Duration
  - Energy
  - Instrumentalness
  - Liveness
  - Loudness
  - Popularity
  - Speechiness
  - Tempo
  - Valence
  
**2. Your top tracks and artists of 1 month, 3 month and a year:**

**3. List your playlists and tracks with more info than Spotify provides e.g.:**

- General musical attributes
  - Playlist/track valence
  - Playlist/track popularity
  - Playlist/track energy
  - Playlist/track danceability
- And for the musicians out there:
  - Key signature of the track
  - Tempo of the track

**4. Create an album cover straight from the webapp**

Using HTML5 canvas and Konva.js

Note: Playback and the album cover upload feature only works for premium accounts

## Tools and tech

Spotilities is built using Next.js (a React framework) and it is a [static](https://nextjs.org/docs/advanced-features/static-html-export) website.

**More tools being used:**

- Redux
- Redux toolkit
- Konva JS & React Konva
- Styled components
- Typescript
- Testing with Jest, Sinon and React Test Renderer
- Spotify's web API

## Development

After cloning:

**Install the dependencies:**

```sh
npm install
```

**Run development server:**

```sh
npm run dev
```

**I recommend using VScode and installing the following plugins:**

1. Eslint VScode plugin
2. Stylelint VScode plugin
3. vscode-styled-components by Julien Poissonnier for styled-components linting

**Tip:**

To keep your sanity with the linting rules, I recommend that you configure VScode to auto fix linting errors on each save.

**Note:**

Development requires Node version 12+

## Deployment

To deploy it on your own, you need to get two main keys:

1. Spotify OAuth2 client ID
2. Google Analytics public ID (Optional, just remove mine if you don't want GA)
3. Pixabay API key
4. API key for Google's web fonts API. (Search for: https://www.googleapis.com/webfonts/v1/webfonts?) and replace the API key in the URL

Then search for `SPOTIFY_CLIENT_ID` and `GA_TRACKING_ID` and replace the existing keys.

To build the project, run:

```sh
npm run build && npm run export
```

This will generate the disribution files in the `/out` directory. After that, all you have to do is to serve this directory with a web server.

## Known issues

- Playback doesn't work for non-premium users.
- Playback doesn't work if no active official Spotify App is found.
- If you login for the first time and mistyped your password, then when you retype it correctly, authentication will fail due to missing Client ID. To solve this, you have to close the tab and reopen it and enter the correct password on your first attempt.
- Some privacy plugins like [Privacy Badger](https://privacybadger.org/) incorrectly block all traffic to: api.spotify.com. If you're stuck with a loading screen, try whitelisting api.spotify.com.
- For some very weird reason (CORS related), you might need to click on (or drag and drop) a stock image twice to make it visible in the canvas.

## Privacy

I do not collect any personal information or any sort of access whatsover. All the action is happening only between your browser and Spotify's API.

I added a Google Analytics plugin to see how users interact with the website, which pages users visit, what features users use etc. The GA plugin doesn't collect any personal information either. I also opted out from sharing the information I collect with Google (Which is kind of a moot point given that the data is already stored on Google's servers). I'd appreciate if you would stop any tracker-blocker or adblocker (not that there are any ads) for this website.
