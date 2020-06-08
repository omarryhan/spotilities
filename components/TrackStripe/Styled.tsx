import styled from 'styled-components';
import { media } from '../../configs/theme';

export const Container = styled.div<{notClickable?: boolean}>`
  width: 100%;
  display: flex;
  height: 65px;
  justify-content: space-between;
  padding: 5px 0;
  cursor: ${(props): string => (!props.notClickable ? 'pointer' : 'default')};

  &:hover {
    background-color: ${(props): string => (!props.notClickable ? props.theme.colors.gray.lightest : 'inherit')};
  }
`;

export const LeftSection = styled.div<{fullWidth?: boolean}>`
  height: 100%;
  max-width: ${(props): string => (props.fullWidth ? '100%' : '70%')};
  display: flex;
`;

export const RightSection = styled.div`
  height: 100%;
  max-width: 30%;
`;

export const ImageSection = styled.div`
  height: 100%;
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
  font-size: 16px;
  margin: 0 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-left: 10px;
  font-family: "Proxima Bold", Georgia, sans-serif;
  color: ${(props): string => props.theme.colors.white.light};
`;

export const ArtistAndAlbumName = styled.p`
  font-size: 12px;
  margin: 0 0;
  padding-left: 10px;
  color: ${(props): string => props.theme.colors.white.evenDarker};
`;
