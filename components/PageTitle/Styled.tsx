import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: "Proxima Bold", Georgia, sans-serif;
  font-weight: normal;
  font-size: 2.25rem;
  padding: 0px ${(props): string => props.theme.dimensions.contentSideMargin.all};
`;
