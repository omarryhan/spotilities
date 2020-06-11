import React from 'react';
import { PictureSkeleton, BodySkeleton, BodySkeletonWrapper } from './Styled';
import { OuterContainer, LeftSection } from '../PlaylistListItem/Styled';


const Component: React.FC<{}> = () => (
  <>
    {
      Array(8).fill('_').map((_, i) => (
        <OuterContainer key={`${String(i)}-Skeleton`} notClickable>
          <LeftSection>
            <PictureSkeleton variant="rect" />
            <BodySkeletonWrapper>
              <BodySkeleton variant="text" />
            </BodySkeletonWrapper>
          </LeftSection>
        </OuterContainer>
      ))
    }
  </>
);

export default Component;
