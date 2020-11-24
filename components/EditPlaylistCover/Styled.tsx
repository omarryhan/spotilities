import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Body = styled.div`
  width: 100%;
  padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.all};
  margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.all} + 10px);
`;

export const SubmitButton = styled.button`
  /* Remove all styles */
  background: none;
  padding: 0;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  background-color: ${(props): string => props.theme.colors.green.primary};
  color: ${(props): string => props.theme.colors.white.light};
  font-size: 20px;
  width: 130px;
  height: 40px;
  border-radius: 25px;
  font-weight: bold;

  &:active {
    color: ${(props): string => props.theme.colors.white.lightest};
  }

  &:disabled {
    background-color: ${(props): string => props.theme.colors.gray.lightest};
    color: ${(props): string => props.theme.colors.white.dark};
  }
`;

export const TopBar = styled.div`
  display: flex;
  padding: 30px 0;
  justify-content: space-between;
`;

export const CanvasWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  padding-bottom: 20px;

  & div {
    & div {
      margin: 0 auto;
    }
  }
`;

export const BottomNav = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background-color: ${(props): string => props.theme.colors.gray.light};
`;

export const BottomEditMenus = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
`;

export const BottomEditMenu = styled(Button)<{active: boolean}>`
  height: 100%;
  /*Fill the remaining horizontal space*/
  flex: 1;
  display: block;
  text-transform: capitalize;
  padding: 0;

  & p {
    font-size: 16px;
    margin: 0;
    display: block;
    text-align: center;
    color: ${(props): string => (props.active ? props.theme.colors.white.light : props.theme.colors.white.evenDarkest)}; 
  }

  & span {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
`;

export const BottomEditMenuStatus = styled.div<{active: boolean}>`
  width: 100%;
  height: 3px;
  position: absolute;
  bottom: 0;
  background-color: ${(props): string => (props.active ? props.theme.colors.green.primary : 'transparent')};
`;
