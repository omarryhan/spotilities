import styled from 'styled-components';

const longLength = '85px';
const shortLength = '65px';

export const Container = styled.div<{notClickable?: boolean; longLength?: boolean}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: ${(props): string => (props.longLength ? longLength : shortLength)};
  margin-bottom: 15px;
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
  display: flex;
  justify-content: flex-end;
`;

export const ImageSection = styled.div<{longLength?: boolean}>`
  height: 100%;
  width: ${(props): string => (props.longLength ? longLength : shortLength)};
`;

export const Img = styled.img`
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

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${(props): string => props.theme.colors.white.evenDarker};
`;

export const MoreText = styled.div`
  padding-left: 10px;
  padding-top: 10px;

  & p {
    color: ${(props): string => props.theme.colors.white.evenDarkest};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

`;
