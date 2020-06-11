import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { media } from '../../configs/theme';
import { LinkButtonProps } from './types';

export const Nav = styled.nav<{second?: boolean}>`
  position: fixed;
  left: 0;
  width: 100%;
  z-index: ${(props): string => props.theme.zIndeces.header};

  ${media.lessThan<{second?: boolean}>('tablet')`
    height: ${(props): string => props.theme.dimensions.topNavbar.mobile};
    bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.mobile} + ${(props): string => (props.second ? props.theme.dimensions.topNavbar.mobile : '0px')});
  `}

  ${media.greaterThan<{second?: boolean}>('tablet')`
    height: ${(props): string => props.theme.dimensions.topNavbar.desktop};
    bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.desktop} + ${(props): string => (props.second ? props.theme.dimensions.topNavbar.desktop : '0px')});
  `}

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
  font-size: 16px;
  margin: 0 0;
  text-align: center;
  /* font-weight: ${(props): string => (props.isLight ? 'bold' : 'regular')}; */
  color: ${(props): string => (props.isLight ? props.theme.colors.white.light : props.theme.colors.white.evenDarkest)};
`;
