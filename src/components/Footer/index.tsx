import React from 'react';

type FooterProps = {};

export const Footer: React.FC<FooterProps> = ({ children }) => {
  const today = new Date();

  return (
    <footer className="w3-container w3-padding-16 w3-center" style={{ marginTop: 'auto' }}>
      <small>&copy; Copyright {today.getFullYear()}, LeNoob</small>
    </footer>
  );
};
