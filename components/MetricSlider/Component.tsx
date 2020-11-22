import React from 'react';
import Slider from '@material-ui/core/Slider';

import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { TunableMetrics, MetricAttributes } from '../../redux/recommendations/types';
import { setMetric } from '../../redux/recommendations/actions';
import { allAttributes } from '../MetricSelector/Data';
import { AttributeInfo } from '../MetricSelector/types';

import {
  Container,
  IconWrapper,
  SliderWrapper,
} from './Styled';

interface Props {
  name: TunableMetrics;
}

const Component: React.FC<Props> = ({ name }) => {
  const dispatch = useDispatch();
  const metric = useSelector<CombinedStateType, MetricAttributes>(
    (state) => state.recommendations.metrics[name],
  );
  const metricDefinition = allAttributes[name] as AttributeInfo;

  const setValues = (event: React.ChangeEvent<{}>, values: number | number[]): void => {
    const minAndMax = values as number[];
    dispatch(setMetric({
      name,
      attributes: {
        isActivated: true,
        min: minAndMax[0],
        max: minAndMax[1],
      },
    }));
  };

  return (
    <Container>
      <IconWrapper>
        <metricDefinition.icon />
      </IconWrapper>

      <SliderWrapper>
        <Slider
          value={[metric.min, metric.max] as number[]}
          min={metricDefinition.isActivatedPayload.min}
          max={metricDefinition.isActivatedPayload.max}
          defaultValue={[metric.min, metric.max] as number[]}
          onChange={setValues}
          step={1}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={(values: number): string => `Values: ${values}`}
        />
      </SliderWrapper>
    </Container>
  );
};

export default Component;
