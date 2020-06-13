import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
  width: 100%;
`;

export const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};

  height: 40px;
`;

export const MenuTitle = styled.h2`
  margin: 0 0;
  font-size: 40px;
`;

export const MenuIconContainer = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  
  & > svg {
    height: 100%;
    fill: ${(props): string => props.theme.colors.white.light};
  }
`;

export const CollapseWrapper = styled(animated.div)`
  width: 100%;
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};

  margin-top: 20px;
`;
