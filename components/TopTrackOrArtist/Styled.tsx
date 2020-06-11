import styled from 'styled-components';

export const Nav = styled.nav`
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */ /* vendor prefixed*/
  position: sticky;

  display: flex;

  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;

  z-index: ${(props): string => props.theme.zIndeces.header};

  background-color: ${(props): string => props.theme.colors.gray.dark};
  top: ${(props): string => props.theme.dimensions.headerHeight.all};
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};

`;

export const StyledLink = styled.a<{isActive?: boolean}>`
  font-size: 20px;
  margin-right: 20px;
  font-weight: bold;

  border-bottom: ${(props): string => (props.isActive ? `0.1rem solid ${props.theme.colors.green.primary}` : `0 solid ${props.theme.colors.white.evenDarkest}`)};
  color: ${(props): string => (props.isActive ? props.theme.colors.white.light : props.theme.colors.white.evenDarkest)};

  cursor: pointer;
`;
