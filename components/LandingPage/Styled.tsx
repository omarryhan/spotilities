import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const SignInButton = styled.button`
  width: 220px;
  height: 50px;

  background: ${(props): string => props.theme.colors.green.primary};
  border-radius: 5px;
  border: none;
  outline: inherit;
  font: inherit;
  color: ${(props): string => props.theme.colors.white.lightest};

  font-size: 20px;

  &:active {
    background: ${(props): string => props.theme.colors.green.dark};
    color: ${(props): string => props.theme.colors.white.dark};
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
`;

export const OpenSourceIconContainer = styled.div`
    order: 1;
    text-align: center;
  @media (min-width: ${(props): string => props.theme.breakpoints.tablet}) {
    order: 2;
  }
`;
