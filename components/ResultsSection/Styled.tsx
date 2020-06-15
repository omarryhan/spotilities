import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.all};
  margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.all} + 10px);
`;

export const TracksContainer = styled.div`
  width: 100%;
`;

export const Title = styled.h2`
  margin: 0 0;
  padding: 15px 0;
`;
