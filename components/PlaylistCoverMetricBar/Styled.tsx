import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

export const Metric = styled.div`
  width: 100%;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
`;

export const NameWrapper = styled.div`
  width: 40%;
  padding-left: 3px;
`;

export const Name = styled.p`
  font-size: 0.8rem;
  margin: 0 0;
  color: ${(props): string => props.theme.colors.white.light};
  text-transform: capitalize;
`;

export const IconWrapper = styled.div`
  padding: 3px 3px;
  width: 25px;
  display: flex;
  align-items: center;

  & > svg {
    fill: ${(props): string => props.theme.colors.white.light};
    width: 100%;
  }
`;

export const MetricWrapper = styled.div`
  min-width: 55%;

  & > span {
    height: 5px;
    border-radius: 5px;
    display: block;
  }
`;

export const MetricBarBackground = styled.span`
  position: relative;
  background-color: ${(props): string => props.theme.colors.gray.light};
  width: 100%;

  & > span {
    height: 5px;
    border-radius: 5px;
    display: block;
  }
`;

export const MetricBar = styled.span<{percentageWidth?: number}>`
  position: absolute;
  background-color: ${(props): string => props.theme.colors.green.primary};
  width: ${(props): string => (typeof props.percentageWidth !== 'undefined' ? props.percentageWidth.toString() : '1')}%;
  bottom: 0;
`;

export const MetricBarSkeleton = styled(Skeleton)`
  background-color: ${(props): string => props.theme.colors.gray.evenLightest};
  width: 100%;
`;
