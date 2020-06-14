import React from 'react';

import styled from 'styled-components';

interface Props {
  progress: number;
}

const Background = styled.div`
  width: 100%;
  height: 3px;
  position: relative;
`;

const Bar = styled.span<Props>`
  position: absolute;
  text-align: left;
  height: 100%;
  background-color: ${(props): string => props.theme.colors.green.primary};
  width: ${(props): string => props.progress.toString()}%;
`;

const Component: React.FC<Props> = ({ progress }) => (
  <Background>
    <Bar progress={progress} />
  </Background>
);

export default Component;
