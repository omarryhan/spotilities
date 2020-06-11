import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import { AvailableDurations, AvailableResourceTypes } from '../../redux/top/types';
import { fetchTopItems } from '../../redux/top/actions';
import ArtistStripe from '../ArtistStripe';
import LazyLoadOnScroll from '../LazyLoadOnScroll';
import Skeleton from '../TrackStripe/Skeleton';

import {
  Container,
} from './Styled';

interface Props {
  currentType: AvailableResourceTypes;
  currentDuration: AvailableDurations;
}

const Component: React.FC<Props> = ({ currentDuration }) => {
  const dispatch = useDispatch();

  const topArtistIds = useSelector<CombinedStateType, string[] | []>(
    (state) => state.top.artists[currentDuration].data,
  );

  React.useEffect(() => {
    dispatch(fetchTopItems({
      resourceType: 'artists',
      duration: currentDuration,
    }));
  }, [currentDuration, dispatch]);

  return (
    <Container>
      {
        topArtistIds.length
          ? (
            <LazyLoadOnScroll
              maxItems={topArtistIds.length}
              startingItems={15}
            >
              { ({ nToRender }): ReturnType<React.FC<{}>> => (
                <>
                  {
                    (topArtistIds.slice(0, nToRender).map((artistId, index) => (
                      <ArtistStripe
                        artistId={artistId}
                        key={artistId}
                      />
                    )))
                  }
                </>
              )}
            </LazyLoadOnScroll>
          )
          : (
            Array(8).fill('_').map((_, i) => (
              <Skeleton key={`${String(i)}-Skeleton`} />
            ))
          )
      }
    </Container>
  );
};

export default Component;
