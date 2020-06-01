import styled from 'styled-components';
import { media } from '../../configs/theme';

export const Header = styled.header`
  ${media.lessThan('tablet')`
    height: 5px ${(props): string => props.theme.dimensions.headerHeight.mobile};
  `}

  ${media.greaterThan('tablet')`
    height: 5px ${(props): string => props.theme.dimensions.headerHeight.desktop};
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

export const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0 0;
  font-size: 1rem;
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
