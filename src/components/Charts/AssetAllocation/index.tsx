import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveContainer } from 'recharts';
import { Container, ContainerBody } from 'components/Container';
import { NoData } from 'components/NoData';
import { ResponsiveWrapper } from 'components/ResponsiveWrapper';
import { percentFormat } from 'utils/format.utils';
import { GEN_COLORS } from 'consts/color-theme';
import { PieChartLoader } from 'components/Skeletons/PieChart';

type AssetAllocationProps = {
  isLoading?: boolean;
  data?: { id: string; name: string; value: number }[];
};

export const AssetAllocation: React.FC<AssetAllocationProps> = ({ isLoading, data }) => {
  if (isLoading) {
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PieChartLoader />
        </div>
      </ResponsiveContainer>
    );
  }

  if (!data || data.length < 1) {
    return (
      <Container title="Asset Allocation">
        <ContainerBody>
          <NoData />
        </ContainerBody>
      </Container>
    );
  }

  return (
    <Container title="Asset Allocation">
      <ContainerBody>
        <ResponsiveContainer width="100%" aspect={1}>
          <ResponsiveWrapper>
            <ResponsivePie
              data={data}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              valueFormat={(val) => percentFormat.format(val / 100)}
              innerRadius={0.7}
              padAngle={1}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={GEN_COLORS(data.length)}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              enableArcLinkLabels={false}
              arcLinkLabelsSkipAngle={3}
              arcLinkLabelsTextColor={{ from: 'color' }}
              arcLinkLabelsThickness={1}
              arcLinkLabelsColor={{ from: 'color' }}
              enableArcLabels={true}
              arcLabelsSkipAngle={15}
              arcLabelsTextColor="#ffffff"
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.5)',
                  size: 2,
                  padding: 4,
                  stagger: true
                }
              ]}
              legends={[]}
            />
          </ResponsiveWrapper>
        </ResponsiveContainer>
      </ContainerBody>
    </Container>
  );
};
