import React from 'react';
import { Container, ContainerBody } from 'components/Container';
import { NoData } from 'components/NoData';
import { ResponsiveWrapper } from 'components/ResponsiveWrapper';
import { ResponsiveContainer } from 'recharts';
import { currencyFormat } from 'utils/format.utils';
import { ResponsiveBar } from '@nivo/bar';
import { GEN_COLORS } from 'consts/color-theme';
import { BarChartLoader } from 'components/Skeletons/BarChart';

type MonthDividendProps = {
  isLoading?: boolean;
  keys: string[];
  data?: { [key: string]: string | number }[];
};

export const MonthlyDividend: React.FC<MonthDividendProps> = ({ isLoading, keys, data }) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BarChartLoader />
      </div>
    );
  }

  if (!data || data.length < 1) {
    return (
      <Container title="Monthly Dividend">
        <ContainerBody>
          <NoData />
        </ContainerBody>
      </Container>
    );
  }

  return (
    <Container title="Monthly Dividend">
      <ContainerBody>
        <ResponsiveContainer width="100%" aspect={2}>
          <ResponsiveWrapper>
            <ResponsiveBar
              data={data}
              keys={keys}
              indexBy="monthName"
              margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={GEN_COLORS(keys.length)}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0
              }}
              labelSkipWidth={50}
              labelSkipHeight={20}
              labelFormat={(val) => currencyFormat.format(Number(val))}
              labelTextColor="#ffffff"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              tooltipFormat={(val) => currencyFormat.format(Number(val))}
              // layout="horizontal"
              enableGridX={false}
              enableGridY={true}
            />
          </ResponsiveWrapper>
        </ResponsiveContainer>
      </ContainerBody>
    </Container>
  );
};
