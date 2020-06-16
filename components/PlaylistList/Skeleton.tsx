import React from 'react';
import { PictureSkeleton, BodySkeleton, BodySkeletonWrapper } from './Styled';
import { Button, Container, LeftSection } from '../PlaylistListItem/Styled';

const Component: React.FC<{}> = () => (
  <>
    {
      Array(16).fill('_').map((_, i) => (
        <Button key={`${String(i)}-Skeleton`} notClickable>
          <Container>
            <LeftSection>
              <PictureSkeleton variant="rect" />
              <BodySkeletonWrapper>
                <BodySkeleton variant="text" />
              </BodySkeletonWrapper>
            </LeftSection>
          </Container>
        </Button>
      ))
    }
  </>
);

export default Component;
