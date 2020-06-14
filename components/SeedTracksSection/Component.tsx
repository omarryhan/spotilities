import React from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import TrackStripe from '../TrackStripe';
import AddIcon from '../../public/icons/add.svg';
import { removeSeedTrack } from '../../redux/recommendations/actions';

import {
  Container,
  SelectTrackStripeContainer,
  SelectTrackStripeContents,
  SelectTrackStripeIconContainer,
  SelectTrackStripeText,
  TrackStripeContainer,
  RemoveButtonSection,
  TrackStripeSection,
  RemoveButton,
  Title,
  Description,
} from './Styled';
import RemoveIcon from '../../public/icons/remove.svg';
import NextButton from '../NextButton';

const SelectTrackStripe: React.FC<{}> = () => (
  <SelectTrackStripeContainer
    onClick={(): Promise<boolean> => Router.push('/recommend/select/playlist')}
  >
    <SelectTrackStripeContents>
      <SelectTrackStripeIconContainer>
        <AddIcon />
      </SelectTrackStripeIconContainer>

      <SelectTrackStripeText>
        Add track
      </SelectTrackStripeText>
    </SelectTrackStripeContents>
  </SelectTrackStripeContainer>
);

const Component: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const seedTracks = useSelector<CombinedStateType, string[]>(
    (state) => state.recommendations.seedTracks,
  );

  return (
    <>
      <Title>
        Seed Tracks:
      </Title>
      <Description>
        Choose tracks that you want Spotilities to find tracks similar in taste to
      </Description>
      <Container>
        {
          !seedTracks.length
            ? (
              <SelectTrackStripe />
            )
            : (
              <>
                {
                  seedTracks.map((seedTrackId, index) => (
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
                <SelectTrackStripe />
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
