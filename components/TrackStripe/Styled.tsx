import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

const longLength = '85px';
const shortLength = '65px';

export const Container = styled.button<{notClickable?: boolean; longLength?: boolean}>`
  /* Remove all styles */
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  text-align: left;
  padding: 0 0;

  width: 100%;
  display: flex;
  justify-content: space-between;
  height: ${(props): string => (props.longLength ? longLength : shortLength)};
  margin-bottom: 15px;
  cursor: ${(props): string => (!props.notClickable ? 'pointer' : 'default')};

  &:active {
    background-color: ${(props): string => (!props.notClickable ? props.theme.colors.gray.lightest : 'inherit')};
  }
`;

export const LeftSection = styled.div<{fullWidth?: boolean}>`
  height: 100%;
  max-width: ${(props): string => (props.fullWidth ? '100%' : '75%')};
  display: flex;
`;

export const RightSection = styled.div`
  height: 100%;
  max-width: 25%;
  display: flex;
  justify-content: flex-end;
`;

export const ImageSection = styled.div<{longLength?: boolean}>`
  height: 100%;
  min-width: ${(props): string => (props.longLength ? longLength : shortLength)};
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
  font-size: 18px;
  margin: 0 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-left: 10px;
  font-family: "Proxima Bold", Georgia, sans-serif;
  color: ${(props): string => props.theme.colors.white.light};
`;

export const ArtistAndAlbumName = styled.p`
  font-size: 13px;
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

export const PictureSkeleton = styled(Skeleton)`
    height: 100%;
    width: 65px; /* TODO: find a way to force it to be equals to height */
    background-color: ${(props): string => props.theme.colors.gray.lightest};
`;

export const BodySkeleton = styled(Skeleton)`
    width: 100px;
    margin-left: 10px;
    height: 25px;
    background-color: ${(props): string => props.theme.colors.gray.lightest};
`;
