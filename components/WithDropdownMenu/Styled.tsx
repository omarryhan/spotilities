import styled from 'styled-components';

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

  min-height: 50px;
  cursor: pointer;

  background-color: rgba(30, 30, 30, 1);

  &:active {
    background-color: ${(props): string => props.theme.colors.gray.dark};
  }

  height: 1rem;
`;

export const MenuTitle = styled.h2`
  margin: 0 0;
  font-size: 30px;
  color: ${(props): string => props.theme.colors.white.light};
`;

interface MenuIconContainerProps {
  isChildVisible: boolean;
}

export const MenuIconContainer = styled.div<MenuIconContainerProps>`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > svg {
    height: 100%;
    fill: ${(props): string => props.theme.colors.white.light};
    transform: ${(props): string => (props.isChildVisible ? 'none' : 'rotate(270deg)')}
  }
`;

export const CollapseWrapper = styled.div`
  width: 100%;
  padding: 0 calc(${(props): string => props.theme.dimensions.contentSideMargin.all});

  margin-top: 20px;
`;
