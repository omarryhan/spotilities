import styled from 'styled-components';

export const Container = styled.div`
  height: 125px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: calc(${(props): string => props.theme.dimensions.contentSideMargin.all} + 10px);
`;

export const Button = styled.button`
  width: 150px;
  height: 50px;

  background: ${(props): string => props.theme.colors.green.primary};
  border-radius: 5px;
  border: none;
  outline: inherit;
  font: inherit;
  color: ${(props): string => props.theme.colors.white.lightest};

  font-size: 16px;

  &:active {
    background: ${(props): string => props.theme.colors.green.dark};
    color: ${(props): string => props.theme.colors.white.dark};
  }

  &:disabled {
    background: ${(props): string => props.theme.colors.gray.evenLightest};
  }
`;
