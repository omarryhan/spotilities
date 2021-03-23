import styled, { keyframes, Keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const SignInButton = styled.button`
  width: 275px;
  height: 60px;

  background: ${(props): string => props.theme.colors.green.primary};
  border-radius: 30px;
  border: none;
  white-space: nowrap;
  outline: inherit;
  font: inherit;
  color: ${(props): string => props.theme.colors.white.lightest};

  font-size: 20px;

  &:active {
    background: ${(props): string => props.theme.colors.green.dark};
    color: ${(props): string => props.theme.colors.white.dark};
  }

  &:hover {
    background: #19a249;
    color: ${(props): string => props.theme.colors.white.primary};
  }

  &:disabled {
    background: ${(props): string => props.theme.colors.gray.evenLightest};
  }
`;

export const Waves1Wrapper = styled.div`
  & > svg {
    width: 100%;
  }
  margin-top: 50px;
  /* Just to make sure it doesn't clip */
  margin-bottom: -2px;
  display: flex;
  align-items: flex-end;
`;

export const Waves2Wrapper = styled.div`
  & > svg {
    width: 100%;
  }
  margin-bottom: 50px;
  /* Just to make sure it doesn't clip */
  margin-top: -2px;
  display: flex;
  align-items: flex-end;
`;

export const OpenSourceContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props): string => props.theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const OpenSourceTextContainer = styled.div`
  order: 2;
  @media (min-width: ${(props): string => props.theme.breakpoints.tablet}) {
    order: 1;
  }
  padding: 0 20px 0 0;
`;

export const OpenSourceIconContainer = styled.div`
  order: 1;
  text-align: center;

  @media (min-width: ${(props): string => props.theme.breakpoints.tablet}) {
    order: 2;
    text-align: right;
  }

  & > svg {
    width: 150px;
  }
`;

export const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props): string => props.theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    align-items: top;
  }

  & > div > p {
    font-size: 22px;
    margin: 0 0 42px 0;
  }
`;

const heartBeat = keyframes`
  {
    0%
    {
      transform: scale( 1 );
    }
    20%
    {
      transform: scale( .9 );
    }
    40%
    {
      transform: scale( 1.1 );
    }
    60%
    {
      transform: scale( .97 );
    }
    80%
    {
      transform: scale( 1.1 );
    }
    100%
    {
      transform: scale( 1 );
    }
  }
`;

export const SpotilitiesLogoWrapper = styled.div<{isHeartBeatOn: boolean}>`
  width: 200px;
  margin: 0 auto;
  padding-top: 60px;

  & > svg {
    animation: ${(props): Keyframes | string => (props.isHeartBeatOn ? heartBeat : 'none')};
    animation-duration: 1s;
  }
`;
