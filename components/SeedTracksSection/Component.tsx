import React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import TrackStripe from '../TrackStripe';
import { removeSeedTrack } from '../../redux/recommendations/actions';

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

  const onSelectBoxClickHandler = (): Promise<boolean> => Router.push('/recommend/select/playlist');

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
                          onClick={(): any => dispatch(removeSeedTrack(seedTrackId))}
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
        onClick={() => Router.push('/recommend/select/track-attributes')}
        disabled={!seedTracks.length}
      />
    </>
  );
};

export default Component;
