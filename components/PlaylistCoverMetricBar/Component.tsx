import React from 'react';

import FeatureIcon from '../FeatureIcon';

import {
  MetricBar,
  Metric,
  IconWrapper,
  MetricWrapper,
  MetricBarBackground,
  Name,
  NameWrapper,
  MetricBarSkeleton,
} from './Styled';

import {
  AvailableMetrics,
} from '../PlaylistMetricBar/types';

const Component: React.FC<{
  percentage: number;
  name: AvailableMetrics;
  isLoading: boolean;
}> = ({ percentage, name, isLoading }) => {
  console.log(isLoading);
  return (
    <Metric>
      <IconWrapper>
        <FeatureIcon name={name} />
      </IconWrapper>
      <NameWrapper>
        <Name>
          {name}
        </Name>
      </NameWrapper>
      <MetricWrapper>
        {isLoading
          ? <MetricBarSkeleton />
          : (
            <MetricBarBackground>
              <MetricBar percentageWidth={percentage} />
            </MetricBarBackground>
          )}
      </MetricWrapper>
    </Metric>
  );
};

export default Component;
