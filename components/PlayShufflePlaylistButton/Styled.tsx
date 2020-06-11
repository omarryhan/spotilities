import styled from 'styled-components';

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const Button = styled.button`
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */ /* vendor prefixed*/
  position: sticky;

  /* Remove all styles */
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  background-color: ${(props): string => props.theme.colors.green.primary};
  color: ${(props): string => props.theme.colors.white.light};
  font-size: 20px;
  width: 175px;
  height: 50px;
  border-radius: 25px;
  font-weight: bold;

  &:active {
    background-color: ${(props): string => props.theme.colors.green.light};
    color: ${(props): string => props.theme.colors.white.lightest};
    font-size: 20px;
    width: 180px;
    height: 52.5px;
  }
`;
