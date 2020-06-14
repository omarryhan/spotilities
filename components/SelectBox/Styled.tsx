import styled from 'styled-components';

export const SelectTrackStripeContainer = styled.button`
  /* Remove all styles */
  background: none;
  color: inherit;
  font: inherit;
  outline: inherit;
  text-align: left;

  width: 100%;
  display: block;
  cursor: pointer;
  border: 1px ${(props): string => props.theme.colors.white.evenDarker} dashed;

  &:active {
    background-color: ${(props): string => props.theme.colors.gray.light};
  }

  height: calc(65px); /*Height of trackstripe without any fluff (65px) + its margin bottom (15px)*/
`;

export const SelectTrackStripeContents = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SelectTrackStripeIconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 1vw;
  margin-right: 10px;
  margin-left: 10px;

  & > svg {
    fill: ${(props): string => props.theme.colors.white.dark};
    height: 40%;
  }
`;

export const SelectTrackStripeText = styled.p`
  font-weight: bold;
  margin: 0 0;
  font-size: 16px;
  color: ${(props): string => props.theme.colors.white.dark};
`;
