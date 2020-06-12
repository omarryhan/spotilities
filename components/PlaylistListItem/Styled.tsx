import styled from 'styled-components';

export const Button = styled.button<{notClickable?: boolean}>`
  /* Remove all styles */
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  text-align: left;


  width: 100%;
  height: 100px;

  display: block;
  padding: 10px 0;
  cursor: ${(props): string => (!props.notClickable ? 'pointer' : 'default')};

  &:active {
    background-color: ${(props): string => (!props.notClickable ? props.theme.colors.gray.lightest : 'inherit')};
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LeftSection = styled.div<{fullWidth?: boolean}>`
  height: 100%;
  max-width: ${(props): string => (props.fullWidth ? '100%' : '70%')};
  display: flex;
`;

export const RightSection = styled.div`
  height: 100%;
  width: 80px;
  max-width: 30%;
`;

export const ImageSection = styled.div`
  height: 100%;
  min-width: 80px;
`;

export const TitleSection = styled.div`
  height: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Img = styled.img`
  height: 100%;
`;

export const Name = styled.p`
  margin: 0 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-left: 10px;
  font-size: 1rem;
  font-family: "Proxima Bold", Georgia, sans-serif;
  color: ${(props): string => props.theme.colors.white.light};
`;

export const NumberOfTracks = styled.p`
  margin: 0 0;
  padding-left: 10px;
  font-size: 0.7rem;
  color: ${(props): string => props.theme.colors.white.evenDarker};
`;
