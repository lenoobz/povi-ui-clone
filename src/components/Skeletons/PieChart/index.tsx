import React from 'react';
import ContentLoader from 'react-content-loader';

type PieChartLoaderProps = {};

export const PieChartLoader: React.FC<PieChartLoaderProps> = () => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={200}
      viewBox="0 0 250 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="90" cy="80" r="70" />
      <rect x="180" y="20" rx="0" ry="0" width="7" height="7" />
      <rect x="200" y="20" rx="0" ry="0" width="30" height="7" />
      <rect x="180" y="34" rx="0" ry="0" width="7" height="7" />
      <rect x="200" y="34" rx="0" ry="0" width="30" height="7" />
      <rect x="180" y="48" rx="0" ry="0" width="7" height="7" />
      <rect x="200" y="48" rx="0" ry="0" width="30" height="7" />
      <rect x="180" y="62" rx="0" ry="0" width="7" height="7" />
      <rect x="200" y="62" rx="0" ry="0" width="30" height="7" />
    </ContentLoader>
  );
};
