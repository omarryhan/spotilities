import styled from 'styled-components';
import { media } from '../../configs/theme';

export const Nav = styled.nav`
  position: sticky;

  display: flex;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;

  z-index: ${(props): string => props.theme.zIndeces.header};

  background-color: ${(props): string => props.theme.colors.gray.dark};

  ${media.lessThan('tablet')`
    top: ${(props): string => props.theme.dimensions.headerHeight.mobile};
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `};

  ${media.greaterThan('tablet')`
    top: ${(props): string => props.theme.dimensions.headerHeight.desktop};
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `};
`;

export const StyledLink = styled.a<{isActive?: boolean}>`
  font-size: 22px;
  margin-right: 22px;
  font-weight: bold;

  border-bottom: ${(props): string => (props.isActive ? `0.1rem solid ${props.theme.colors.green.primary}` : `0 solid ${props.theme.colors.white.evenDarkest}`)};
  color: ${(props): string => (props.isActive ? props.theme.colors.white.light : props.theme.colors.white.evenDarkest)};

  cursor: pointer;
`;
