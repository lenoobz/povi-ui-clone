import React from 'react';

type ContainerProps = {
  title?: string;
  action?: {
    label: string;
    onClick?: (data: any) => void;
  };
};

export const Container: React.FC<ContainerProps> = ({ title, action, children }) => {
  const containerTitle = title ? (
    <p className="w3-bar-item w3-medium">
      <span>{title}</span>
    </p>
  ) : null;

  const containerAction = action ? (
    <button className="w3-bar-item w3-right w3-medium w3-button" onClick={action.onClick}>
      <span>{action.label}</span>
    </button>
  ) : null;

  return (
    <div className="w3-container container">
      <div className="w3-bar container-header">
        {containerTitle}
        {containerAction}
      </div>
      <div className="w3-card w3-round-large">{children}</div>
    </div>
  );
};

type ContainerBodyProps = {};

export const ContainerBody: React.FC<ContainerBodyProps> = ({ children }) => {
  return <div className="container-body">{children}</div>;
};
