import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

export const Container = styled.div`
  width: 100%;
  margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.all} + 10px);
  padding-top: 10px;
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
`;

export const PictureSkeleton = styled(Skeleton)`
    height: 100%;
    width: 80px; /* TODO: find a way to force it to be equals to height */
    background-color: ${(props): string => props.theme.colors.gray.lightest};
`;

export const BodySkeletonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const BodySkeleton = styled(Skeleton)`
    width: 100px;
    margin-left: 10px;
    height: 25px;
    background-color: ${(props): string => props.theme.colors.gray.lightest};
`;
