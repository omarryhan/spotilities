import React from 'react';

interface ChildElementProps {
  nToRender: number;
}

interface Props {
  children: (arg0: ChildElementProps) => ReturnType<React.FC<{}>>;
  maxTracks: number;
  startingTracks: number;
}

const Component: React.FC<Props> = ({ children, maxTracks, startingTracks }) => {
  const [nReachedBottom, setNReachedBottom] = React.useState(1);

  const scrollHandler = (): void => {
    const reachedEnd = (
      (window.innerHeight + window.scrollY
      ) >= document.body.offsetHeight
    );
    if (reachedEnd) {
      setNReachedBottom(nReachedBottom + 1);
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('scroll', scrollHandler);
      return function cleanup(): void {
        document.removeEventListener('scroll', scrollHandler);
      };
    } else {
      return undefined;
    }
  });

  return children({ nToRender: nReachedBottom * startingTracks });
};

export default Component;
