import React from 'react';
import { useSpring } from 'react-spring';

import {
  Container,
  MenuContainer,
  MenuIconContainer,
  MenuTitle,
  CollapseWrapper,
} from './Styled';
import DownArrowIcon from '../../public/icons/down.svg';

const Component: React.FC<{title: string}> = ({ children, title }) => {
  const [isChildVisible, setIsChildVisible] = React.useState(false);
  const { open } = useSpring({ open: isChildVisible ? 0 : 1 });
  const toggleIsChildVisible = (): void => setIsChildVisible(!isChildVisible);
  return (
    <Container>
      <MenuContainer>
        <MenuTitle>
          {title}
        </MenuTitle>
        <MenuIconContainer onClick={toggleIsChildVisible}>
          <DownArrowIcon />
        </MenuIconContainer>
      </MenuContainer>
      {
        !isChildVisible
          ? null
          : (
            <CollapseWrapper
              style={{
                transform: open.interpolate({
                  range: [0, 0.2, 0.3, 1],
                  output: [0, -20, 0, -200],
                }).interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
              }}
            >
              {children}
            </CollapseWrapper>
          )
      }
    </Container>
  );
};

export default Component;
