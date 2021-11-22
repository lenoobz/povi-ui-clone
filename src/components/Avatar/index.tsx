import React from 'react';

type AvatarProps = {
  src: string;
  name: string;
};

export const Avatar: React.FC<AvatarProps> = ({ src, name, children }) => {
  return <img src={src} alt={name} className="avatar" />;
};
