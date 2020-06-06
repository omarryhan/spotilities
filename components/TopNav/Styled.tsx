import styled from 'styled-components';
import { media } from '../../configs/theme';

export const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;

  z-index: ${(props): string => props.theme.zIndeces.header};

  ${media.lessThan('tablet')`
    height: ${(props): string => props.theme.dimensions.headerHeight.mobile};
  `}

  ${media.greaterThan('tablet')`
    height: ${(props): string => props.theme.dimensions.headerHeight.desktop};
  `}

  background-color: ${(props): string => props.theme.colors.gray.light}
`;

export const Nav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;

  ${media.lessThan('tablet')`
    padding: 5px ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `}

  ${media.greaterThan('tablet')`
    padding: 5px ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `}
`;

export const NavItem = styled.div<{left?: boolean; right?: boolean}>`
  display: flex;
  justify-content: ${(props): string => (props.left ? 'flex-start' : props.right ? 'flex-end' : 'center')};
  align-items: center;
  min-width: 30px;
`;

export const Title = styled.h1`
  margin: 0 0;
  font-size: 18px;
  font-weight: normal;
  color: ${(props): string => props.theme.colors.white.dark};
`;

export const GreetingText = styled.p`
  margin: 0 0;
  font-size: 0.6rem;
  color: ${(props): string => props.theme.colors.white.dark};
`;

export const Name = styled.p`
  margin: 0 0 0 4px;
  font-size: 0.7rem;
  color: ${(props): string => props.theme.colors.white.dark};
  text-transform: capitalize;
`;

export const SettingsButtonWapper = styled.button`
  /* Remove all styles */
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  /* Center SVG vertically */
  display: flex;
  align-items: center;

  width: 20px;

  & svg {
    width: 100%;
    fill: ${(props): string => props.theme.colors.white.dark};
  }
`;

export const BackButtonWrapper = styled.button`
  /* Remove all styles */
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  /* Center SVG vertically */
  display: flex;
  align-items: center;

  width: 25px;

  padding-right: 5px;

  & svg {
    width: 100%;
    fill: ${(props): string => props.theme.colors.white.dark};
  }
`;
