import styled from 'styled-components';
import { media } from '../../configs/theme';

export const Container = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.desktop} + 10px);

  ${media.lessThan('tablet')`
    padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `};

  ${media.greaterThan('tablet')`
    padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `};
`;
