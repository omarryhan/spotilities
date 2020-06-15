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
  margin-bottom: 10px;

  &:active {
    background-color: ${(props): string => props.theme.colors.gray.light};
  }
`;

export const AttributeIconContainer = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    fill: ${(props): string => props.theme.colors.white.lightest};

    @media screen and (max-width: ${(props): string => props.theme.breakpoints.desktop}) {
      width: 50%;
    }

    @media screen and (max-width: ${(props): string => props.theme.breakpoints.tablet}) {
      width: 80%;
    }

  }
`;

export const AttributeTextContainer = styled.div`
  width: 80%;
  padding-left: 10px;
`;

export const AttributeTitle = styled.h2`
  margin: 0 0 5px 0;
  font-size: 24px;
`;

export const AttributeDescription = styled.p`
  margin: 0 0;
  font-size: 14px;
  color: ${(props): string => props.theme.colors.white.dark};
`;
