import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.all} + 10px);
  padding-top: 10px;
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
`;
