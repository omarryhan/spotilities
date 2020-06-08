import styled from 'styled-components';
import { media } from '../../configs/theme';


export const Container = styled.div`
  width: 100%;
`;

export const Slider = styled.div`
  width: 100%;
`;

// https://codepen.io/chriscoyier/pen/XwbNwX?editors=1100
// https://codepen.io/Schepp/pen/WNbQByE?editors=1100
export const Slides = styled.div<{bgColor: string}>`
  display: flex;
  
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scrollbar-color: ${(props): string => props.bgColor} rgba(40, 40, 40,1);
  scrollbar-width: 1px;
  scrollbar-arrow-color: ${(props): string => props.theme.colors.gray.dark};
`;

export const Slide = styled.div<{bgColor: string}>`
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 100%;
  height: 375px;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;

  background: rgba(18,18,18,1);
  background: linear-gradient(0deg, ${(props): string => props.theme.colors.gray.dark} 0%, ${(props): string => props.bgColor} 100%);
`;


export const PlaylistCoverPhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 auto;
  height: 250px;
  width: 200px;
`;

export const PlaylistTitle = styled.h2`
  text-align: center;
  color: #fff;
  margin: 0 0;
  max-height: 125px;
  font-size: 1.5rem;

  ${media.lessThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `};

  ${media.greaterThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `};

  padding-top: 30px;
  padding-bottom: 40px;
`;

export const MetricsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding-top: 20px;
  padding-bottom: 60px;

  ${media.lessThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `};

  ${media.greaterThan('tablet')`
    padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
    padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `};
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DescriptionText = styled.p`
  font-size: 0.8rem;
  text-align: center;
`;
