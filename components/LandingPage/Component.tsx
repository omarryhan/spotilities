import React from 'react';
import Router from 'next/router';
import Particles from 'react-particles-js';
import {
  Container,
  SignInButton,
  Waves1Wrapper,
  Waves2Wrapper,
  OpenSourceContainer,
  OpenSourceTextContainer,
  OpenSourceIconContainer,
  FeaturesContainer,
  SpotilitiesLogoWrapper,
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
        width: '32px', height: '32px', overflow: 'visible', margin: '0 0 0 0',
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
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      zIndex: -100,
    }}
    >
      <Particles params={{
        autoPlay: true,
        background: {
          color: {
            // It's #121212 in the app
            // not sure which I like best
            value: '#000000',
          },
          image: '',
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover',
          opacity: 1,
        },
        backgroundMask: {
          composite: 'destination-out',
          cover: {
            color: {
              value: '#fff',
            },
            opacity: 1,
          },
          enable: false,
        },
        fullScreen: {
          enable: true,
          zIndex: 1,
        },
        detectRetina: true,
        fpsLimit: 60,
        infection: {
          cure: false,
          delay: 0,
          enable: false,
          infections: 0,
          stages: [],
        },
        interactivity: {
          detectsOn: 'canvas',
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'connect',
              parallax: {
                enable: false,
                force: 60,
                smooth: 10,
              },
            },
            resize: true,
          },
          modes: {
            attract: {
              distance: 200,
              duration: 0.4,
              speed: 1,
            },
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            connect: {
              distance: 80,
              links: {
                opacity: 0.5,
              },
              radius: 60,
            },
            grab: {
              distance: 400,
              links: {
                blink: false,
                consent: false,
                opacity: 1,
              },
            },
            light: {
              area: {
                gradient: {
                  start: {
                    value: '#ffffff',
                  },
                  stop: {
                    value: '#000000',
                  },
                },
                radius: 1000,
              },
              shadow: {
                color: {
                  value: '#000000',
                },
                length: 2000,
              },
            },
            push: {
              quantity: 4,
            },
            remove: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
              speed: 1,
            },
            slow: {
              factor: 3,
              radius: 200,
            },
            trail: {
              delay: 1,
              quantity: 1,
            },
          },
        },
        manualParticles: [],
        motion: {
          disable: false,
          reduce: {
            factor: 4,
            value: true,
          },
        },
        particles: {
          bounce: {
            horizontal: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
            vertical: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
          },
          collisions: {
            bounce: {
              horizontal: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
              vertical: {
                random: {
                  enable: false,
                  minimumValue: 0.1,
                },
                value: 1,
              },
            },
            enable: false,
            mode: 'bounce',
            overlap: {
              enable: true,
              retries: 0,
            },
          },
          color: {
            value: 'random',
            animation: {
              h: {
                count: 0,
                enable: false,
                offset: 0,
                speed: 1,
                sync: true,
              },
              s: {
                count: 0,
                enable: false,
                offset: 0,
                speed: 1,
                sync: true,
              },
              l: {
                count: 0,
                enable: false,
                offset: 0,
                speed: 1,
                sync: true,
              },
            },
          },
          life: {
            count: 0,
            delay: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
              sync: false,
            },
            duration: {
              random: {
                enable: false,
                minimumValue: 0.0001,
              },
              value: 0,
              sync: false,
            },
          },
          links: {
            blink: false,
            color: {
              value: '#ffffff',
            },
            consent: false,
            distance: 150,
            enable: false,
            frequency: 1,
            opacity: 0.4,
            shadow: {
              blur: 5,
              color: {
                value: '#1ED760',
              },
              enable: false,
            },
            triangles: {
              enable: false,
              frequency: 1,
            },
            width: 1,
            warp: false,
          },
          move: {
            angle: {
              offset: 45,
              value: 90,
            },
            attract: {
              enable: false,
              rotate: {
                x: 600,
                y: 1200,
              },
            },
            decay: 0,
            direction: 'none',
            distance: 0,
            enable: true,
            gravity: {
              acceleration: 9.81,
              enable: false,
              maxSpeed: 50,
            },
            path: {
              clamp: true,
              delay: {
                random: {
                  enable: false,
                  minimumValue: 0,
                },
                value: 0,
              },
              enable: false,
            },
            outModes: {
              default: 'out',
              bottom: 'out',
              left: 'out',
              right: 'out',
              top: 'out',
            },
            random: false,
            size: false,
            // Change speed here
            speed: 2.5,
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fillColor: {
                value: '#000000',
              },
            },
            vibrate: false,
            warp: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
              factor: 1000,
            },
            limit: 250,
            // Change number of bubbles here
            value: 15,
          },
          opacity: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            // change opacity here
            value: 0.2,
            animation: {
              count: 0,
              enable: false,
              speed: 1,
              sync: false,
              destroy: 'none',
              minimumValue: 0.1,
              startValue: 'random',
            },
          },
          reduceDuplicates: false,
          rotate: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
            animation: {
              enable: false,
              speed: 0,
              sync: false,
            },
            direction: 'clockwise',
            path: false,
          },
          shape: {
            options: {},
            type: 'circle',
          },
          size: {
            random: {
              enable: true,
              minimumValue: 5,
            },
            // change size here
            value: 15,
            animation: {
              count: 0,
              enable: false,
              speed: 40,
              sync: false,
              destroy: 'none',
              minimumValue: 0.1,
              startValue: 'random',
            },
          },
          stroke: {
            width: 0,
          },
          twinkle: {
            lines: {
              enable: false,
              frequency: 0.05,
              opacity: 1,
            },
            particles: {
              enable: false,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        responsive: [],
        themes: [],
      }}
      />
    </div>
    <section style={{
      maxWidth: '700px',
      margin: '0 auto',
      paddingTop: '35px',
    }}
    >
      <SpotilitiesLogoWrapper>
        <SpotilitiesIconGreen />
      </SpotilitiesLogoWrapper>
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
    </section>

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
          margin: '24px 0 50px 0',
        }}
        >
          Here&apos;s what you&apos;ve been missing out on
        </h2>

        <FeaturesContainer>
          <div style={{
            paddingRight: '20px',
            paddingBottom: '32px',
          }}
          >
            <p>
              <span role="img" aria-label="number 1 emoji">
                1️⃣
              </span>
              . Generate new playlists using special music attributes.
              e.g. Danceability and popularity.
            </p>

            <p>
              <span role="img" aria-label="number 2 emoji">
                2️⃣
              </span>
              . View your top tracks and artists, this month, this year and of all time.
            </p>

            <p>
              <span role="img" aria-label="number 3 emoji">
                3️⃣
              </span>
              . Know how your playlists are perceived by Spotify.
              For example, you can know how danceable your playlist is and
              compare it with other playlists.
            </p>

            <p>
              <span role="img" aria-label="number 4 emoji">
                4️⃣
              </span>
              . Create a playlist cover using our cute cover design tool.
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
                paddingBottom: '40px',
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
      paddingBottom: '75px',
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
            fontSize: '22px',
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
