import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TrackStripe from '../TrackStripe';

import { playTrackURIS } from '../../redux/playback/actions';
import {
  Container,
  Title,
  TracksContainer,
} from './Styled';
import { fetchRecommendations } from '../../redux/recommendations/actions';
import { CombinedStateType } from '../../redux/types';

const Component: React.FC<{}> = () => {
  const isFetchingResults = useSelector<CombinedStateType, boolean>(
    (state) => state.recommendations.status.isFetching,
  );

  const trackIdsResults = useSelector<CombinedStateType, string[]>(
    (state) => state.recommendations.results.trackIds,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  return (
    <Container>
      {isFetchingResults
        ? 'Doing magic...'
        : (
          <>
            <Title>
              Found
              {' '}
              {trackIdsResults.length}
              {' '}
              recommendations
            </Title>
            <TracksContainer>
              {
                trackIdsResults.map((trackId) => (
                  <TrackStripe
                    key={trackId}
                    trackId={trackId}
                    onClickHandler={(trackIdClicked, _): void => {
                      dispatch(playTrackURIS({
                        trackId: trackIdClicked,
                        trackURIs: trackIdsResults,
                        shufflePlay: false,
                      }));
                    }}
                  />
                ))
              }
            </TracksContainer>
          </>
        )}
    </Container>
  );
};

export default Component;
