import React from 'react';

type ProgressBarProps = {};

export const ProgressBar: React.FC<ProgressBarProps> = () => {
  return (
    <div className="page-progress-bar">
      <div className="progress-bar">
        <div className="progress-bar-value"></div>
      </div>
    </div>
  );
};
