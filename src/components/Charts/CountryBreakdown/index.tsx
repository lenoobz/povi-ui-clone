import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { Container, ContainerBody } from 'components/Container';
import { NoData } from 'components/NoData';
import { ResponsiveChoropleth } from '@nivo/geo';
import { percentFormat } from 'utils/format.utils';
import { GEN_COLORS } from 'consts/color-theme';
import { WorldMapLoader } from 'components/Skeletons/WorldMap';
import countries from './world_countries.json';

type CountryBreakdownProps = {
  isLoading?: boolean;
  data?: { id: string; name: string; value: number }[];
};

export const CountryBreakdown: React.FC<CountryBreakdownProps> = ({ isLoading, data }) => {
  if (isLoading) {
    return (
      <ResponsiveContainer width="100%" aspect={1}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WorldMapLoader />
        </div>
      </ResponsiveContainer>
    );
  }

  if (!data || data.length < 1) {
    return (
      <Container title="Geographical Diversification">
        <ContainerBody>
          <NoData />
        </ContainerBody>
      </Container>
    );
  }

  return (
    <Container title="Geographical Diversification">
      <ContainerBody>
        <ResponsiveContainer width="100%" aspect={1}>
          <ResponsiveGeo data={data} />
        </ResponsiveContainer>
      </ContainerBody>
    </Container>
  );
};

type ResponsiveGeoProps = {
  width?: number;
  height?: number;
  data: any[];
};

export const ResponsiveGeo: React.FC<ResponsiveGeoProps> = ({ width = 0, height = 0, data }) => {
  const values = data.map<number>((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const scale = (width / 640) * 100;

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <ResponsiveChoropleth
        data={data}
        features={countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={GEN_COLORS()}
        domain={[min, max]}
        unknownColor="#e3f2fd"
        label="properties.name"
        valueFormat={(val) => percentFormat.format(val / 100)}
        projectionScale={scale}
        projectionRotation={[0, 0, 0]}
        enableGraticule={false}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#ffffff"
      />
    </div>
  );
};
