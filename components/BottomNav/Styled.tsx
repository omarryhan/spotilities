import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { media } from '../../configs/theme';

export const Nav = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  ${media.lessThan('tablet')`
    height: ${(props): string => props.theme.dimensions.bottomAppBarHeight.mobile};
  `}

  ${media.greaterThan('tablet')`
    height: ${(props): string => props.theme.dimensions.bottomAppBarHeight.desktop};
  `}

  background-color: ${(props): string => props.theme.colors.gray.light}
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export const LinkButton = styled(Button)`
  width: 100%;
  height: 100%;

  & svg {
    // fill: white;
    stroke: white;
    width: 30px;
    height: 30px;
  }
`;

export const Img = styled.img`
  width: 30px;
  /* filter: invert(100%); */
`;
