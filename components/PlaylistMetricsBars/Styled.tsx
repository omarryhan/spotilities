import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const MetricBarSkeleton = styled(Skeleton)`
  background-color: ${(props): string => props.theme.colors.gray.evenLightest};
  height: 100%;
`;
