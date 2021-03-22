import React from 'react';
import Router from 'next/router';
import {
  Container,
  SignInButton,
  Waves1Wrapper,
  Waves2Wrapper,
  OpenSourceContainer,
  OpenSourceTextContainer,
  OpenSourceIconContainer,
  FeaturesContainer,
} from './Styled';

import SpotilitiesIconGreen from '../../public/icons/spotilites_green.svg';
import SpotilitiesIconWhite from '../../public/icons/spotilites_white.svg';
import Waves1 from '../../public/icons/waves_1.svg';
import Waves2 from '../../public/icons/waves_2.svg';
import SpotifyWhite from '../../public/icons/spotify_white.svg';
import OpenSourceLogo from '../../public/icons/opensource.svg';

const SigninButton: React.FC = () => (
  <SignInButton onClick={(): void => {
    Router.push('/recommend');
  }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}
    >
      <div style={{
        width: '32px', height: '32px', overflow: 'visible', margin: '0 5px',
      }}
      >
        <SpotifyWhite />
      </div>
      <p style={{
        fontSize: '22px',
        margin: '0 0',
        fontWeight: 'bold',
      }}
      >
        Sign in with Spotify
      </p>
    </div>
  </SignInButton>
);

const Component: React.FC = () => (
  <main>
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      paddingTop: '35px',
    }}
    >
      <div
        style={{
          width: '200px',
          margin: '0 auto',
          paddingTop: '60px',
        }}
      >
        <SpotilitiesIconGreen />
      </div>
      <h1 style={{
        textAlign: 'center',
        fontSize: '52px',
        margin: '30px 0 10px 0',
      }}
      >
        Spotilities
      </h1>
      <p
        style={{
          textAlign: 'center',
          fontSize: '24px',
          width: '260px',
          margin: '0 auto',
          fontFamily: 'Proxima Nova',
          fontWeight: 'normal',
        }}
      >
        Your
        {' '}
        swiss army knife
        {' '}
        for
        {' '}
        Spotify
        {' '}
        🧰
      </p>
      <div style={{
        padding: '50px 0',
        textAlign: 'center',
      }}
      >
        <SigninButton />
      </div>
    </div>

    <Waves1Wrapper>
      <Waves1 />
    </Waves1Wrapper>

    <div style={{
      width: '100%',
      backgroundColor: '#333333',
    }}
    >
      <section style={{
        maxWidth: '700px',
        margin: '0 auto',
        width: '100%',
        padding: '30px 15px',
      }}
      >
        <h2 style={{
          fontSize: '42px',
          margin: '24px 0 36px 0',
        }}
        >
          Here&apos;s what you&apos;re missing out on:
        </h2>

        <FeaturesContainer>
          <div style={{
            paddingRight: '10px',
            paddingBottom: '32px',
          }}
          >
            <p>
              1. Generate new playlists using different music attributes
            </p>

            <p>
              2. View your top tracks and artists
            </p>

            <p>
              3. Know how your music is perceived by the algo
            </p>

            <p>
              4. Create a playlist cover using our cute cover design tool
            </p>
          </div>
          <div style={{
            textAlign: 'center',
          }}
          >
            <img
              src="https://camo.githubusercontent.com/0d2597240c5fcc4102b938b56ad330efe685e1bba83490fcb834a7c8a8af3b81/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f506b39756d6b5935775552345152463377302f67697068792e676966"
              alt="Animated usage of the app show casing it"
              style={{
                margin: '0 auto',
              }}
            />
          </div>
        </FeaturesContainer>

      </section>
    </div>

    <Waves2Wrapper>
      <Waves2 />
    </Waves2Wrapper>

    <section style={{
      maxWidth: '700px',
      margin: '0 auto',
      width: '100%',
      padding: '15px',
      paddingBottom: '100px',
    }}
    >
      <OpenSourceContainer>
        <OpenSourceTextContainer>
          <h2 style={{
            fontSize: '42px',
            margin: '46px 0 12px 0',
          }}
          >
            Still not convinced?
          </h2>
          <p style={{
            fontSize: '20px',
            fontFamily: 'Proxima Nova',
          }}
          >
            Spotilities is completely
            {' '}
            <strong> free </strong>
            {' '}
            and
            {' '}
            <strong>open source</strong>
            .
            <br />
            That means you can freely checkout the source code and change it if you wish.
          </p>
        </OpenSourceTextContainer>

        <OpenSourceIconContainer>
          <OpenSourceLogo />
        </OpenSourceIconContainer>
      </OpenSourceContainer>

      <div style={{
        textAlign: 'center',
        padding: '50px 0',
      }}
      >
        <SigninButton />
      </div>
    </section>

    <footer
      style={{
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div style={{
        width: '50px',
        margin: '0 auto',
        opacity: '0.3',
      }}
      >
        <SpotilitiesIconWhite />
      </div>
      <p
        style={{
          opacity: '0.3',
          fontSize: '12px',
          margin: '5px',
        }}
      >
        Spotilities | ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        All rights not reserved ;p
      </p>
      <p
        style={{
          marginTop: '0px',
          opacity: '0.3',
          fontSize: '12px',
        }}
      >
        <a style={{ textDecoration: 'none' }} href="https://github.com/omarryhan/spotilities">
          Source code
        </a>
        &nbsp;
        &nbsp;
        <a style={{ textDecoration: 'none' }} href="https://github.com/omarryhan/spotilities#Privacy">
          Privacy
        </a>
      </p>
    </footer>
    <Container />
  </main>
);

export default Component;
