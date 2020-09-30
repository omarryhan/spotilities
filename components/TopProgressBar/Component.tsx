import React from 'react';

import styled from 'styled-components';

interface Props {
  progress: number;
}

const Background = styled.div`
  position: fixed;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${(props): string => props.theme.zIndeces.header};

  height: 3px;
  width: 700px;
`;

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Bar = styled.span<Props>`
  background-color: ${(props): string => props.theme.colors.green.primary};
  width: ${(props): string => props.progress.toString()}%;
  height: 100%;
  position: absolute;
`;

const Component: React.FC<Props> = ({ progress }) => (
  <Background>
    <Bg>
      <Bar progress={progress} />
    </Bg>
  </Background>
);

export default Component;
