import React from 'react';
import {
  MetricBarSkeleton,
  Container,
} from './Styled';
import {
  MetricWrapper,
  Metric,
  IconWrapper,
} from '../PlaylistMetricBar/Styled';
import DanceabilityIcon from '../../public/icons/dance.svg';
import EnergyIcon from '../../public/icons/flash.svg';
import ValenceIcon from '../../public/icons/happy.svg';
import PopularityIcon from '../../public/icons/trending.svg';

const Component: React.FC = () => (
  <Container>
    <Metric>
      <MetricWrapper>
        <MetricBarSkeleton />
      </MetricWrapper>
      <IconWrapper>
        <EnergyIcon />
      </IconWrapper>
    </Metric>
    <Metric>
      <MetricWrapper>
        <MetricBarSkeleton />
      </MetricWrapper>
      <IconWrapper>
        <DanceabilityIcon />
      </IconWrapper>
    </Metric>
    <Metric>
      <MetricWrapper>
        <MetricBarSkeleton />
      </MetricWrapper>
      <IconWrapper>
        <ValenceIcon />
      </IconWrapper>
    </Metric>
    <Metric>
      <MetricWrapper>
        <MetricBarSkeleton />
      </MetricWrapper>
      <IconWrapper>
        <PopularityIcon />
      </IconWrapper>
    </Metric>
  </Container>
);

export default Component;
