import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { LinkButtonProps } from './types';

export const Nav = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  z-index: ${(props): string => props.theme.zIndeces.header};
  height: ${(props): string => props.theme.dimensions.bottomAppBarHeight.all};

  background-color: ${(props): string => props.theme.colors.gray.light};
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export const LinkContainer = styled(Button)`
  height: 100%;
  width: 100%;
  padding: 5px 0;
  border-radius: 0;

  & span {
    height: 100%;
    display: block;
  }
`;

export const LinkTitle = styled.p<LinkButtonProps>`
  height: 30%;
  /* font-size: 0.6rem; */
  text-transform: capitalize;
  font-size: 10px;
  margin: 0 0;
  text-align: center;
  /* font-weight: ${(props): string => (props.isLight ? 'bold' : 'regular')}; */
  color: ${(props): string => (props.isLight ? props.theme.colors.white.light : props.theme.colors.white.evenDarkest)};
`;

export const LinkIcon = styled.div<LinkButtonProps>`
  width: 100%;
  height: 70%;
  padding: 2px 0;

  & svg {
    fill: ${(props): string => (props.isLight ? props.theme.colors.white.light : props.theme.colors.white.evenDarkest)};
    height: 100%;
  }
`;

export const Img = styled.img`
  width: 30px;
  /* filter: invert(100%); */
`;
