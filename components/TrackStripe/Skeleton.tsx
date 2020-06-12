import React from 'react';
import {
  Container,
  LeftSection,
  PictureSkeleton,
  BodySkeleton,
  BodySkeletonWrapper,
  Button,
} from './Styled';

const Component: React.FC<{}> = () => (
  <Button notClickable>
    <Container>
      <LeftSection>
        <PictureSkeleton variant="rect" />
        <BodySkeletonWrapper>
          <BodySkeleton variant="text" />
        </BodySkeletonWrapper>
      </LeftSection>
    </Container>
  </Button>
);

export default Component;
