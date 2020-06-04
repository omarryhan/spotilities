import styled from 'styled-components';
import { media } from '../../configs/theme';

export const H1 = styled.h1`
  font-family: "Proxima Bold", Georgia, sans-serif;
  font-weight: normal;
  font-size: 2.25rem;

  ${media.lessThan('tablet')`
    padding: 0px ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `}

  ${media.greaterThan('tablet')`
    padding: 0px ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `}
`;
