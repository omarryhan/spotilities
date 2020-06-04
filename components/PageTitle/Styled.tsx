import styled from 'styled-components';
import { media } from '../../configs/theme';

export const H1 = styled.h1`
  font-family: "Proxima Bold", Georgia, sans-serif;
  font-weight: normal;

  ${media.lessThan('tablet')`
    margin: 15px ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `}

  ${media.greaterThan('tablet')`
    margin: 15px ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `}
`;
