/* eslint-disable no-param-reassign */
import React from 'react';
import styled from 'styled-components';
import { PixabayHit } from './pixabayAPI';

interface Props {
  hits: PixabayHit[];
  requestOneMorePage: () => Promise<void>;
  imageDragUrl: React.RefObject<string>;
  onImgClick: (url: string) => void;
}

const Roll = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  overflow-x: scroll;
`;

const Img = styled.img`
  margin-right: 20px;
  height: 120px;
`;

const Component: React.FC<Props> = ({
  hits,
  requestOneMorePage,
  imageDragUrl,
  onImgClick,
}) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const reachedEnd = (
      e.target as HTMLDivElement).scrollWidth - (
      e.target as HTMLDivElement).scrollLeft - (
      // +50 to make it load a new page a bit before reaching the end.
      e.target as HTMLDivElement).clientWidth === 0;

    if (reachedEnd) {
      requestOneMorePage();
    }
  };

  return (
    <Roll onScroll={handleScroll}>
      {hits.map((hit) => (
        <Img
          // Options
          // 1. previewURL (smallest)
          // 2. webformatURL
          // 3. largeImageURL
          // 4. fullHDURL
          src={hit.webformatURL}
          alt="pixabay search result"
          key={hit.webformatURL}
          draggable="true"
          onDragStart={(e: React.UIEvent<HTMLImageElement>): void => {
            (
              imageDragUrl.current as string
            ) = (
                  e.target as HTMLImageElement
                ).src;
          }}
          onClick={(): void => onImgClick(hit.webformatURL)}
        />
      ))}
    </Roll>
  );
};

export default Component;
