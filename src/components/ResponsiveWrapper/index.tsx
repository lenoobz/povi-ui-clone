import React from 'react';

type ResponsiveWrapperProps = {
  width?: number;
  height?: number;
};

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ width, height, children }) => {
  return <div style={{ width: `${width}px`, height: `${height}px` }}>{children}</div>;
};
