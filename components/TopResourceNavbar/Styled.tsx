import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { LinkButtonProps } from './types';

export const Nav = styled.nav`
  position: fixed;
  left: 0;
  width: 100%;
  z-index: ${(props): string => props.theme.zIndeces.header};
  height: ${(props): string => props.theme.dimensions.topResourceNavbar.all};
  bottom: ${(props): string => props.theme.dimensions.bottomAppBarHeight.all};

  border-bottom: 0.5px solid ${(props): string => props.theme.colors.gray.dark};

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
`;

export const LinkTitle = styled.p<LinkButtonProps>`
  text-transform: capitalize;
  font-size: 14px;
  margin: 0 0;
  text-align: center;
  /* font-weight: ${(props): string => (props.isLight ? 'bold' : 'regular')}; */
  color: ${(props): string => (props.isLight ? props.theme.colors.white.lightest : props.theme.colors.white.evenDarkest)};
`;
