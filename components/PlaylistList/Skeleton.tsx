import React from 'react';
import { PictureSkeleton, BodySkeleton } from './Styled';
import { OuterContainer, LeftSection } from '../PlaylistListItem/Styled';


const Component: React.FC<{}> = () => (
  <>
    {
      Array(8).fill('_').map((_, i) => (
        <OuterContainer key={`${String(i)}-Skeleton`} notClickable>
          <LeftSection>
            <PictureSkeleton variant="rect" />
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}
            >
              <BodySkeleton variant="text" />
            </div>
          </LeftSection>
        </OuterContainer>
      ))
    }
  </>
);

export default Component;
