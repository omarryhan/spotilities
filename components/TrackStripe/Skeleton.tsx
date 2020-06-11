import React from 'react';
import {
  Container,
  LeftSection,
  PictureSkeleton,
  BodySkeleton,
  BodySkeletonWrapper,
} from './Styled';


const Component: React.FC<{}> = () => (
  <Container notClickable>
    <LeftSection>
      <PictureSkeleton variant="rect" />
      <BodySkeletonWrapper>
        <BodySkeleton variant="text" />
      </BodySkeletonWrapper>
    </LeftSection>
  </Container>
);


export default Component;
