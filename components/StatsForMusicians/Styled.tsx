import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const Text = styled.p`
  font-size: 11px;
  margin: 0 0;
`;

export const IconWrapper = styled.div`
  padding: 0 0;
  margin: 0 0;
  height: 12px;
  text-align: left;

  & svg {
    height: 100%;
    fill: ${(props): string => props.theme.colors.white.darkest};
  }
`;
