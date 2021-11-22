import React from 'react';

type PageProps = {};

export const PageContent: React.FC<PageProps> = ({ children }) => {
  return <div className="w3-main w3-auto page-content">{children}</div>;
};
