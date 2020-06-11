import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

const height = '105px';

export const Container = styled.button`
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
  height: ${height};
  margin-bottom: 15px;
  cursor: pointer;

  &:active {
    background-color: ${(props): string => props.theme.colors.gray.lightest};
  }
`;

export const ImageSection = styled.div`
  height: 100%;
  width: ${height};
  overflow: hidden;
  text-align: center;
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

export const PictureSkeleton = styled(Skeleton)`
  height: 100%;
  width: ${height}; /* TODO: find a way to force it to be equals to height */
  background-color: ${(props): string => props.theme.colors.gray.lightest};
`;

export const BodySkeleton = styled(Skeleton)`
  width: 100px;
  margin-left: 10px;
  height: 25px;
  background-color: ${(props): string => props.theme.colors.gray.lightest};
`;
