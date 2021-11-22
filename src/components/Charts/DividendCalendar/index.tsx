import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { Container, ContainerBody } from 'components/Container';
import { NoData } from 'components/NoData';
import { ResponsiveWrapper } from 'components/ResponsiveWrapper';
import { ResponsiveCalendar } from '@nivo/calendar';
import { GEN_COLORS } from 'consts/color-theme';
import { CalendarLoader } from 'components/Skeletons/Calendar';
import { getFirstDayOfCurrentYear, getLastDayOfCurrentYear } from 'utils/datetime.utils';

type DividendCalendarProps = {
  isLoading?: boolean;
  data?: {
    day: string;
    value: number;
    data: string[];
  }[];
};

export const DividendCalendar: React.FC<DividendCalendarProps> = ({ isLoading, data }) => {
  if (isLoading) {
    return (
      <ResponsiveContainer width="100%" aspect={5}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CalendarLoader />
        </div>
      </ResponsiveContainer>
    );
  }

  if (!data || data.length < 1) {
    return (
      <Container title="Dividend Calendar">
        <ContainerBody>
          <NoData />
        </ContainerBody>
      </Container>
    );
  }

  const startDate = getFirstDayOfCurrentYear();
  const endDate = getLastDayOfCurrentYear();

  return (
    <Container title="Dividend Calendar">
      <ContainerBody>
        <ResponsiveContainer width="100%" aspect={5}>
          <ResponsiveWrapper>
            <ResponsiveCalendar
              data={data}
              from={startDate}
              to={endDate}
              emptyColor="#eeeeee"
              colors={GEN_COLORS()}
              margin={{ top: 10, right: 10, bottom: 10, left: 20 }}
              yearSpacing={40}
              monthSpacing={5}
              monthBorderColor="#ffffff"
              dayBorderColor="#ffffff"
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'row',
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: 'right-to-left'
                }
              ]}
              tooltip={CustomTooltip}
            />
          </ResponsiveWrapper>
        </ResponsiveContainer>
      </ContainerBody>
    </Container>
  );
};

const CustomTooltip = (d: any) => {
  if (d.value === undefined) {
    return null;
  }

  if (d.data === undefined || d.data.data === undefined || d.data.data.length < 1) {
    return null;
  }

  const size = 10;
  let tickers = null;
  let len = d.data.data.length;
  let items = d.data.data.slice(0, size).map((t: string, i: number) => <li key={i}>{t}</li>);
  if (len > size) {
    items.push(<li key={size}>...</li>);
  }

  tickers = <ul style={{ listStyleType: 'none', margin: 0, padding: '2px 25px', fontSize: '9px' }}>{items}</ul>;

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '5px 8px',
        borderRadius: '3px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ backgroundColor: d.color, width: '15px', height: '15px', marginRight: '5px' }} />
        {d.day}
      </div>
      {tickers}
    </div>
  );
};
