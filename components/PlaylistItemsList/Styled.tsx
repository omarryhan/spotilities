import styled from 'styled-components';
import { media } from '../../configs/theme';

export const Container = styled.div`
  width: 100%;
  margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.desktop} + 10px);
  padding-top: 10px;

  ${media.lessThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `};

  ${media.greaterThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `};
`;
