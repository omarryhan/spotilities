import React from 'react';
import { Text } from 'react-konva';

interface Props {
  text: string;
}

const Component: React.FC<Props> = ({ text }) => {
  let l;
  return (
    <p>
      {text}
    </p>
  );
};

export default Component;
