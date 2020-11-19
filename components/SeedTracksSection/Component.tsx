import React from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import TrackStripe from '../TrackStripe';
import { removeSeedTrack, setRandomSeedTracks, addTrackSeed } from '../../redux/recommendations/actions';

import {
  Container,
  TrackStripeContainer,
  RemoveButtonSection,
  TrackStripeSection,
  RemoveButton,
  Title,
} from './Styled';
import SelectBox from '../SelectBox';
import RemoveIcon from '../../public/icons/remove.svg';
import NextButton from '../NextButton';

const Component: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const seedTracks = useSelector<CombinedStateType, string[]>(
    (state) => state.recommendations.seedTracks,
  );

  const isFetchingRandomSeedTracks = useSelector<CombinedStateType, boolean>(
    (state) => state.recommendations.status.isFetchingSeedTracks,
  );

  const randomSeedTracks = useSelector<CombinedStateType, string[]>(
    (state) => state.recommendations.randomSeedTracks,
  );

  React.useEffect(() => {
    dispatch(setRandomSeedTracks());
  }, [dispatch]);

  const onSelectBoxClickHandler = (): Promise<boolean> => Router.push(
    '/recommend/select/playlist',
  );

  return (
    <>
      <Title>
        1. Select a track or more that you like:
      </Title>
      <Container>
        {
          !seedTracks.length
            ? (
              <SelectBox
                onClickHandler={onSelectBoxClickHandler}
                text="Select a track"
              />
            )
            : (
              <>
                {
                  seedTracks.map((seedTrackId) => (
                    <TrackStripeContainer key={seedTrackId}>
                      <TrackStripeSection>
                        <TrackStripe
                          trackId={seedTrackId}
                          notClickable
                          onClickHandler={(): void => undefined}
                          hideMetrics
                          hideMusiciansInfo
                        />
                      </TrackStripeSection>

                      <RemoveButtonSection>
                        <RemoveButton
                          type="submit"
                          onClick={(): ReturnType<typeof dispatch> => dispatch(
                            removeSeedTrack(seedTrackId),
                          )}
                        >
                          <RemoveIcon />
                        </RemoveButton>
                      </RemoveButtonSection>
                    </TrackStripeContainer>
                  ))
                }
                {
                  seedTracks.length >= 5
                    ? (
                      null
                    )
                    : (
                      <SelectBox
                        onClickHandler={onSelectBoxClickHandler}
                        text="Select another track"
                      />
                    )
                }
              </>
            )
        }
      </Container>
      <NextButton
        onClick={(): void => {
          if (!seedTracks.length) {
            randomSeedTracks.map((trackId) => dispatch(addTrackSeed(trackId)));
          }

          try {
            // !seedTracks.length
            ReactGA.event({
              category: 'recommendation',
              action: 'select/seed-tracks',
              value: seedTracks.length,
            });
          } finally {
            Router.push('/recommend/select/metrics');
          }
        }}
        text={isFetchingRandomSeedTracks ? 'Loading...' : (
          !randomSeedTracks.length && !isFetchingRandomSeedTracks
        ) ? 'Next' : 'Skip'}
        disabled={
          isFetchingRandomSeedTracks || (
            !isFetchingRandomSeedTracks && !randomSeedTracks.length && !seedTracks.length
          )
        }
      />
    </>
  );
};

export default Component;
