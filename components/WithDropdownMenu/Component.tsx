import React from 'react';

import {
  Container,
  MenuContainer,
  MenuIconContainer,
  MenuTitle,
  CollapseWrapper,
} from './Styled';
import DownArrowIcon from '../../public/icons/down.svg';

const Component: React.FC<{title: string}> = ({ children, title }) => {
  const [isChildVisible, setIsChildVisible] = React.useState(true);
  const toggleIsChildVisible = (): void => setIsChildVisible(!isChildVisible);
  return (
    <Container>
      <MenuContainer onClick={toggleIsChildVisible}>
        <MenuTitle>
          {title}
        </MenuTitle>
        <MenuIconContainer isChildVisible={isChildVisible}>
          <DownArrowIcon />
        </MenuIconContainer>
      </MenuContainer>
      {
        !isChildVisible
          ? null
          : (
            <CollapseWrapper>
              {children}
            </CollapseWrapper>
          )
      }
    </Container>
  );
};

export default Component;
