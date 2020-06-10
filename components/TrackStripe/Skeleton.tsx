import React from 'react';
import {
  Container,
  LeftSection,
  PictureSkeleton,
  BodySkeleton,
} from './Styled';


const Component: React.FC<> = () => (
  <Container notClickable>
    <LeftSection>
      <PictureSkeleton variant="rect" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
      >
        <BodySkeleton variant="text" />
      </div>
    </LeftSection>
  </Container>
);


export default Component;
