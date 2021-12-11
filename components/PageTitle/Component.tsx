import React from 'react';
import { H1 } from './Styled';

const Component: React.FC<{ title: string }> = ({ title }) => (
  <H1>
    {title}
    {' '}
  </H1>
);

export default Component;
