import React from 'react';

import FeatureIcon from '../FeatureIcon';

import {
  MetricBar,
  Metric,
  IconWrapper,
  MetricWrapper,
  MetricBarBackground,
} from './Styled';

import {
  AvailableMetrics,
} from './types';

const Component: React.FC<{
  percentageHeight: number;
  name: AvailableMetrics;
  width?: string;
  height?: string;
}> = ({ percentageHeight, name }) => (
  <Metric>
    <MetricWrapper>
      <MetricBarBackground>
        <MetricBar percentageHeight={percentageHeight} />
      </MetricBarBackground>
    </MetricWrapper>
    <IconWrapper>
      <FeatureIcon name={name} />
    </IconWrapper>
  </Metric>
);

export default Component;
