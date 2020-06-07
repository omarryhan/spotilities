declare module 'react-color-extractor' {
  import React from 'react';

  export const ColorExtractor: React.FC<{
    getColors: (colors: string[]) => void;
  }>;
}
