import React from 'react';
import ContentLoader from 'react-content-loader';

type StatInfoLoaderProps = {};

export const StatInfoLoader: React.FC<StatInfoLoaderProps> = () => {
  return (
    <ContentLoader
      speed={2}
      width={800}
      height={100}
      viewBox="0 0 800 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="30" rx="0" ry="0" width="180" height="35" />
      <rect x="10" y="10" rx="0" ry="0" width="300" height="13" />
    </ContentLoader>
  );
};
