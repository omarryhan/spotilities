<p align="center">
  <img src="https://github.com/omarryhan/spotilities/raw/master/public/icons/logo/512w/logo3manifest-big.png" alt="Logo" title="Spotilities" height="250" width="250"/>
  <p align="center">
    <a href="https://travis-ci.org/omarryhan/spotilities"><img alt="Build Status" src="https://travis-ci.org/omarryhan/spotilities.svg?branch=master"></a>
    <a href="https://app.netlify.com/sites/spotilities/deploys"><img alt="Build status" src="https://api.netlify.com/api/v1/badges/8c0737ed-4b8a-4bb2-b61c-524085f59961/deploy-status"></a>
    <a href="https://github.com/omarryhan/spotilities"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
  </p>
</p>

# Spotilities

The goal of this app is to provide utilities and extra info that aren't included in Spotify's main app.

## Live version (Under construction)

https://spotilities.netlify.app/

**Tip:** For optimal experience, open it on your phone and open your browser's menu and click on "Add to homescreen".

## Features

1. Generate recommendations based on:
  - Tunable attributes:
    - Acousticness 
    - Danceability 
    - Duration
    - Energy 
    - Instrumentalness 
    - Key 
    - Liveness 
    - Loudness 
    - Mode (i.e. major or minor)
    - Popularity 
    - Speechiness 
    - Tempo 
    - Time_signature 
    - Valence
  - Seed artists and tracks
2. Your top tracks and artists of 1 month, 3 month and a year
3. List your playlists and tracks with more info than Spotify provides e.g. 
  - General musical attributes
    - Playlist/track valence
    - Playlist/track popularity
    - Playlist/track energy
    - Playlist/track danceability
  - And for the musicians out there,
    - Key and mode of the track
    - Tempo of the track
    - Time signature of the track

## Tools

Spotilities is built using Next.js and it is a [static](https://nextjs.org/docs/advanced-features/static-html-export) website.

More tools being used:
  - Redux
  - Redux toolkit
  - Styled components
  - Material UI (Sparingly)
  - Typescript
  - Testing with Jest, Sinon and React Test Renderer
  - Eslint plugins:
    - Airbnb base
    - TODO: fill out the rest.

## Development

After cloning:

Install the dependencies:

```sh
yarn
```

Run development server:

```sh
yarn dev
```

## Privacy

I do not collect any personal information or any sort of access whatsover. All the action is only on your browser.

I added a Google Analytics plugin to see how users interact with the website, which pages users visit, what features users use etc. The GA plugin doesn't collect any personal information either. I also opted out from sharing the information I collect with Google (Which is kind of a moot point given that the data is already stored on Google's servers). I'd appreciate if you'd stop any tracker-blocker or adblocker (no ads) for this website.