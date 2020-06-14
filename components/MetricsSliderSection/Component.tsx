import React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { Metrics, TunableMetrics } from '../../redux/recommendations/types';
import { setMetric } from '../../redux/recommendations/actions';
import MetricSlider from '../MetricSlider';
import SelectBox from '../SelectBox';
import NextButton from '../NextButton';
import RemoveIcon from '../../public/icons/remove.svg';

import {
  Container,
  Title,
  TrackStripeContainer,
  TrackStripeSection,
  RemoveButtonSection,
  RemoveButton,
} from '../SeedTracksSection/Styled';

import { allAttributes } from '../MetricSelector/Data';

const Component: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const metrics = useSelector<CombinedStateType, Metrics>(
    (state) => state.recommendations.metrics,
  );

  const unselectedAttributes = useSelector<CombinedStateType, TunableMetrics[]>(
    (state) => {
      const keys = Object.keys(state.recommendations.metrics) as TunableMetrics[];
      return keys.filter(
        (key) => !state.recommendations.metrics[key].isActivated,
      );
    },
  );

  const unselectedAttributesAvailable = unselectedAttributes.filter(
    (key) => Object.keys(allAttributes).includes(key),
  );

  const onSelectBoxClickHandler = (): Promise<boolean> => Router.push('/recommend/select/metric');

  const activeMetrics = Object.keys(metrics)
    .map((metric) => (metrics[metric as TunableMetrics].isActivated ? metric : undefined))
    .filter((metric) => typeof metric !== 'undefined') as TunableMetrics[];

  return (
    <>
      <Title>
        Fine tune your recommendations:
      </Title>
      <Container>
        {
          !activeMetrics.length
            ? (unselectedAttributesAvailable.length ? (
              <SelectBox
                onClickHandler={onSelectBoxClickHandler}
                text="Add an attribute selector"
              />
            ) : null
            )
            : (
              <>
                {
                  activeMetrics.map((activeMetric) => (
                    <TrackStripeContainer key={activeMetric}>
                      <TrackStripeSection>
                        <MetricSlider
                          name={activeMetric}
                        />
                      </TrackStripeSection>

                      <RemoveButtonSection>
                        <RemoveButton
                          type="submit"
                          onClick={(): any => dispatch(
                            setMetric({
                              name: activeMetric,
                              attributes: {
                                isActivated: false,
                              },
                            }),
                          )}
                        >
                          <RemoveIcon />
                        </RemoveButton>
                      </RemoveButtonSection>
                    </TrackStripeContainer>
                  ))
                }
                {
                  unselectedAttributesAvailable.length ? (
                    <SelectBox
                      onClickHandler={onSelectBoxClickHandler}
                      text="Add track"
                    />
                  ) : (null)
                }
              </>
            )
        }
      </Container>
      <NextButton
        onClick={() => Router.push('/recommend/results')}
      />
    </>
  );
};

export default Component;
