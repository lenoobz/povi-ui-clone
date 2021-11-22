import React from 'react';
import { greet } from 'utils/datetime.utils';
import { currencyFormat } from 'utils/format.utils';
import { StatInfoLoader } from 'components/Skeletons/StatInfo';

type DividendStatsProps = {
  isLoading?: boolean;
  name?: string;
  value: number;
};

export const DividendStats: React.FC<DividendStatsProps> = ({ isLoading, name, value }) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StatInfoLoader />
      </div>
    );
  }

  const greeting = greet(name);

  return (
    <div className="account-stat">
      <p className="w3-medium">
        <span>{`${greeting}. Your annual dividend`}</span>
      </p>
      <p className="w3-xxxlarge account-stat-info">
        <span>{`${currencyFormat.format(value)}`}</span>
      </p>
    </div>
  );
};
