import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.all};
`;

export const Title = styled.p`
  font-size: 24px;
  text-align: center;
`;

export const IllustrationWrapper = styled.div`
  text-align: center;
  height: 250px;

  & > svg {
    height: 100%;
  }
`;

export const GetStartedButtonWrapper = styled.div`
  text-align: center;
`;

export const GetStartedButton = styled.button`
  width: 150px;
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
