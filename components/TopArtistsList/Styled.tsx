import styled from 'styled-components';
import { media } from '../../configs/theme';


export const Container = styled.div`
  width: 100%;
  padding-top: 10px;

  ${media.lessThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
    margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.mobile} + ${(props): string => props.theme.dimensions.bottomAppBarHeight.mobile});
  `};

  ${media.greaterThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
    margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.desktop} + ${(props): string => props.theme.dimensions.bottomAppBarHeight.desktop});
  `};
`;
