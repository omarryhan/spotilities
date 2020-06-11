import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styledComponentsTheme } from '../../configs/theme';
import { CombinedStateType } from '../../redux/types';
import {
  Container,
} from './Styled';
import { AvailableDurations, AvailableResourceTypes } from '../../redux/top/types';
import { playTrackURIS } from '../../redux/playback/actions';
import { fetchTopItems } from '../../redux/top/actions';
import TrackStripe from '../TrackStripe';
import LazyLoadOnScroll from '../LazyLoadOnScroll';
import Skeleton from '../TrackStripe/Skeleton';

interface Props {
  currentType: AvailableResourceTypes;
  currentDuration: AvailableDurations;
}

const Component: React.FC<Props> = ({ currentDuration }) => {
  const dispatch = useDispatch();

  const topTrackIds = useSelector<CombinedStateType, string[] | []>(
    (state) => state.top.tracks[currentDuration].data,
  );

  React.useEffect(() => {
    dispatch(fetchTopItems({
      resourceType: 'tracks',
      duration: currentDuration,
    }));
  }, [currentDuration, dispatch]);

  return (
    <Container>
      {
        topTrackIds.length
          ? (
            <LazyLoadOnScroll
              maxTracks={topTrackIds.length}
              startingTracks={15}
            >
              { ({ nToRender }): ReturnType<React.FC<{}>> => (
                <>
                  {
                    (topTrackIds.slice(0, nToRender).map((trackId, index) => (
                      <TrackStripe
                        trackId={trackId}
                        key={trackId}
                        // backgroundColor={  // this is fugly
                        //   index === 0
                        //     ? styledComponentsTheme.colors.gold.primary
                        //     : index === 1
                        //       ? styledComponentsTheme.colors.silver.primary
                        //       : index === 2
                        //         ? styledComponentsTheme.colors.bronze.primary
                        //         : undefined
                        // }
                        onClickHandler={(): ReturnType<typeof dispatch> => dispatch(playTrackURIS({
                          trackId,
                          trackURIs: topTrackIds,
                        }))}
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
