import React from 'react';
import ContentLoader from 'react-content-loader';

type BarChartLoaderProps = {};

export const BarChartLoader: React.FC<BarChartLoaderProps> = () => {
  return (
    <ContentLoader
      speed={2}
      width={225}
      height={185}
      viewBox="0 0 225 185"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="6" y="43" rx="0" ry="0" width="1" height="140" />
      <rect x="6" y="183" rx="0" ry="0" width="360" height="1" />
      <rect x="97" y="83" rx="0" ry="0" width="20" height="100" />
      <rect x="174" y="133" rx="0" ry="0" width="20" height="50" />
      <rect x="136" y="113" rx="0" ry="0" width="20" height="70" />
      <rect x="18" y="43" rx="0" ry="0" width="20" height="140" />
      <rect x="58" y="63" rx="0" ry="0" width="20" height="120" />
      <rect x="229" y="50" rx="0" ry="0" width="35" height="160" />
      <rect x="269" y="170" rx="0" ry="0" width="35" height="40" />
      <rect x="309" y="120" rx="0" ry="0" width="35" height="90" />
      <rect x="10" y="5" rx="2" ry="2" width="90" height="12" />
      <rect x="7" y="2" rx="0" ry="0" width="200" height="15" />
      <rect x="167" y="47" rx="0" ry="0" width="7" height="7" />
      <rect x="187" y="47" rx="0" ry="0" width="30" height="7" />
      <rect x="167" y="61" rx="0" ry="0" width="7" height="7" />
      <rect x="187" y="61" rx="0" ry="0" width="30" height="7" />
      <rect x="167" y="75" rx="0" ry="0" width="7" height="7" />
      <rect x="187" y="75" rx="0" ry="0" width="30" height="7" />
      <rect x="167" y="89" rx="0" ry="0" width="7" height="7" />
      <rect x="187" y="89" rx="0" ry="0" width="30" height="7" />
    </ContentLoader>
  );
};
