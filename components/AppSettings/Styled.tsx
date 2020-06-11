import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: center;
`;


export const Version = styled.p`
  margin: 0 0;
  color: ${(props): string => props.theme.colors.white.evenDarkest};
  font-size: 10px;
`;
