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

  const noMetricsSelected = (
    Object.keys(allAttributes).length - unselectedAttributesAvailable.length
  ) === 0;

  return (
    <>
      <Title>
        2. Add a filter or two (Optional):
      </Title>
      <Container>
        {
          !activeMetrics.length
            ? (unselectedAttributesAvailable.length ? (
              <SelectBox
                onClickHandler={onSelectBoxClickHandler}
                text="Add a filter"
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
                          onClick={(): ReturnType<typeof dispatch> => dispatch(
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
                      text="Add another filter"
                    />
                  ) : (null)
                }
              </>
            )
        }
      </Container>
      <NextButton
        onClick={(): void => {
          if (noMetricsSelected) {
            // Unfortunately, Spotify requires that we provide
            // atleast one tunable attribute value
            // so this is probably the safest workaround.
            setMetric({
              name: 'popularity',
              attributes: {
                min: 0,
                max: 100,
                isActivated: true,
              },
            });
          }
          Router.push('/recommend/results');
        }}
        text={noMetricsSelected ? 'Skip' : 'Next'}
      />
    </>
  );
};

export default Component;
