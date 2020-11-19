import React from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { Metrics, TunableMetrics } from '../../redux/recommendations/types';
import { setMetricIsActivated } from '../../redux/recommendations/actions';
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
  // If a user clicks quick enough on the `next` button in this page
  // after skipping selecting tracks,
  // they might not get a result because the previous page waits for 400ms to
  // add the tracks, so that it doesn't show the user that it's being done under the hood.
  const [
    shouldWaitForRandomSeedTracks,
    setShouldWaitForRandomSeedTracks,
  ] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setShouldWaitForRandomSeedTracks(false), 400);
  }, []);
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
        2. Filter (Optional):
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
                            setMetricIsActivated({
                              name: activeMetric,
                              value: false,
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
          try {
            noMetricsSelected
              ? ReactGA.event({
                category: 'recommendations',
                action: 'select/metric/none',
              })
              : activeMetrics.forEach((metric) => {
                ReactGA.event({
                  category: 'recommendations',
                  action: `select/metric/${metric}`,
                });
              });
          } finally {
            Router.push('/recommend/results');
          }
        }}
        text={shouldWaitForRandomSeedTracks ? 'Loading...' : noMetricsSelected ? 'Skip' : 'Apply Magic'}
        disabled={shouldWaitForRandomSeedTracks}
      />
    </>
  );
};

export default Component;
