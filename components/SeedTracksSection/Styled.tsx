import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.all};
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const Title = styled.h2`
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-top: 20px;
  margin-bottom: 5px;
  color: ${(props): string => props.theme.colors.white.dark};
  font-size: 28px;
`;

export const Description = styled.p`
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  margin: 0 0;
  color: ${(props): string => props.theme.colors.white.evenDarkest};
  font-size: 16px;
`;

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

export const TrackStripeContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const TrackStripeSection = styled.div`
  width: 85%;
  height: 100%;
`;

export const RemoveButtonSection = styled.div`
  width: 15%;
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const RemoveButton = styled.button`
  /* Remove all styles */
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  display: block;
  padding: 0 0;
  padding-right: 3px;
  
  margin-bottom: 5px; /* Keep this equal to TrackStripe's margin bottom (15px)*/

  cursor: pointer;
  width: 100%;
  height: 100%;
  
  text-align: right;

  & > svg {
    width: 24px;
    fill: red;
  }
`;
