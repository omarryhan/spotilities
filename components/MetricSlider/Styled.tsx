import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    fill: ${(props): string => props.theme.colors.white.lightest};

    @media screen and (max-width: ${(props): string => props.theme.breakpoints.desktop}) {
      width: 50%;
    }

    @media screen and (max-width: ${(props): string => props.theme.breakpoints.tablet}) {
      width: 80%;
    }

  }
`;

export const SliderWrapper = styled.div`
  width: 90%;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;
