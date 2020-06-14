import styled from 'styled-components';

export const AllAttributes = styled.div`
  padding: 20px ${(props): string => props.theme.dimensions.contentSideMargin.all};
  width: 100%;
`;

export const Attribute = styled.div`
  display: flex;
  cursor: pointer;

  padding: 10px 10px;
  border-radius: 20px;
  border: 1px white solid;

  &:active {
    background-color: ${(props): string => props.theme.colors.gray.light};
  }
`;

export const AttributeIconContainer = styled.div`
  width: 15%;
  display: flex;
  align-items: center;

  & > svg {
    fill: ${(props): string => props.theme.colors.white.lightest};
    width: 100%;
  }
`;

export const AttributeTextContainer = styled.div`
  width: 85%;
  padding-left: 10px;
`;

export const AttributeTitle = styled.h2`
  margin: 0 0 5px 0;
`;

export const AttributeDescription = styled.p`
  margin: 0 0;
  font-size: 14px;
  color: ${(props): string => props.theme.colors.white.dark};
`;
