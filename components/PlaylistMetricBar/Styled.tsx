import styled from 'styled-components';

export const Metric = styled.div`
  width: 20px;
  margin-left: 3px;
`;

export const IconWrapper = styled.div`
  width: 100%;
  height: 30%;
  padding: 3px 0 0 0;
  position: relative;

  & > svg {
    fill: ${(props): string => props.theme.colors.white.dark};
    width: 100%;
    position: absolute;
    bottom: 0
  }
`;

export const MetricWrapper = styled.div`
  width: 5px;
  height: 70%;
  margin: 0 auto;
  padding: 5px 0;

  & > span {
    width: 5px;
    border-radius: 5px;
    display: block;
  }
`;

export const MetricBarBackground = styled.span`
  position: relative;
  background-color: ${(props): string => props.theme.colors.gray.light};
  height: 100%;

  & > span {
    width: 5px;
    border-radius: 5px;
    display: block;
  }
`;

export const MetricBar = styled.span<{ percentageHeight?: number }>`
  position: absolute;
  background-color: ${(props): string => props.theme.colors.green.primary};
  height: ${(props): string => (typeof props.percentageHeight !== 'undefined' ? props.percentageHeight.toString() : '1')}%;
  bottom: 0;
`;
