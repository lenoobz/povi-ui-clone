import React, { useContext, useEffect, useState } from 'react';
import { MonthlyDividend } from 'components/Charts/MonthlyDividend';
import { DividendCalendar } from 'components/Charts/DividendCalendar';
import { GlobalContext, GlobalContextType } from 'stores/contexts/GlobalContext';
import { DividendResp, EnabledAccounts } from 'types';
import { DividendStats } from 'components/DividendStats';
import { AnnualDividend } from 'components/Charts/AnnualDividend';
import { DashboardLayout } from 'layouts/Dashboard';
import { getDividends } from 'api/fundAPI';
import { MONTH_SHORT_NAMES } from 'utils/datetime.utils';
import { Actions } from 'consts/action.enum';

export const Dividends: React.FC = () => {
  const [dividends, setDividends] = useState<DividendResp[] | undefined>();
  const [ctx, dispatch]: GlobalContextType = useContext(GlobalContext);

  const { isFetching, enabledAccounts, userDetails } = ctx;

  useEffect(() => {
    const fetchDividends = async (userId: string) => {
      try {
        dispatch({ type: Actions.START_FETCHING });
        const resp = await getDividends(userId);
        setDividends(resp);
      } catch (error) {
        dispatch({ type: Actions.ERROR_FETCHING });
      } finally {
        dispatch({ type: Actions.FINISH_FETCHING });
      }
    };

    if (userDetails) {
      fetchDividends(userDetails.sub);
    }
  }, [userDetails, dispatch]);

  const totalDividend = getTotalDividend(dividends, enabledAccounts);
  const annualDividend = getAnnualDividend(dividends, enabledAccounts);
  const calendarDividend = getCalendarDividend(dividends, enabledAccounts);
  const portfolioNames = getPortfolioNames(dividends, enabledAccounts);
  const monthlyDividend = getMonthlyDividend(dividends, enabledAccounts);

  return (
    <DashboardLayout>
      <div className="w3-row">
        <div className="w3-container w3-margin-top w3-margin-bottom">
          <DividendStats isLoading={isFetching} name={userDetails?.name} value={totalDividend} />
        </div>
      </div>
      <div className="w3-row w3-hide-small">
        <DividendCalendar isLoading={isFetching} data={calendarDividend} />
      </div>
      <div className="w3-row">
        <div className="w3-third">
          <AnnualDividend isLoading={isFetching} data={annualDividend} />
        </div>
        <div className="w3-twothird">
          <MonthlyDividend isLoading={isFetching} keys={portfolioNames} data={monthlyDividend} />
        </div>
      </div>
    </DashboardLayout>
  );
};

const getTotalDividend = (portfolios?: DividendResp[], enabledAccounts?: EnabledAccounts) => {
  let total = 0;

  if (!portfolios || portfolios.length < 1) {
    return total;
  }

  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    for (const position of portfolio.positions) {
      const shares = position.shares ?? 0;
      const distAmount = position.distAmount ?? 0;
      const schedule = position.dividendSchedule ?? '';

      let factor = 1;
      if (schedule.toUpperCase() === 'MONTHLY') {
        factor = 12;
      } else if (schedule.toUpperCase() === 'QUARTERLY') {
        factor = 4;
      } else if (schedule.toUpperCase() === 'BI-ANNUALLY') {
        factor = 2;
      } else if (schedule.toUpperCase() === 'ANNUALLY') {
        factor = 1;
      }

      total += factor * shares * distAmount;
    }
  }

  return total;
};

const getAnnualDividend = (portfolios?: DividendResp[], enabledAccounts?: EnabledAccounts) => {
  const annualDividends: { id: string; name: string; value: number }[] = [];

  if (!portfolios || portfolios.length < 1) {
    return annualDividends;
  }

  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    let dividendValue = 0;
    for (const position of portfolio.positions) {
      const shares = position.shares ?? 0;
      const distAmount = position.distAmount ?? 0;
      const schedule = position.dividendSchedule ?? '';

      let factor = 1;
      if (schedule.toUpperCase() === 'MONTHLY') {
        factor = 12;
      } else if (schedule.toUpperCase() === 'QUARTERLY') {
        factor = 4;
      } else if (schedule.toUpperCase() === 'BI-ANNUALLY') {
        factor = 2;
      } else if (schedule.toUpperCase() === 'ANNUALLY') {
        factor = 1;
      }

      dividendValue += factor * shares * distAmount;
    }

    annualDividends.push({
      id: portfolio.accountName,
      name: portfolio.accountName,
      value: dividendValue
    });
  }

  return annualDividends;
};

const getCalendarDividend = (portfolios?: DividendResp[], enabledAccounts?: EnabledAccounts) => {
  if (!portfolios || portfolios.length < 1) {
    return [];
  }

  const dates: {
    [day: string]: {
      day: string;
      value: number;
      data: string[];
    };
  } = {};

  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    for (const position of portfolio.positions) {
      const divs = position.dividends;

      if (divs) {
        Object.values(divs).forEach((div) => {
          const d = div.payableDate ?? div.exDividendDate ?? div.recordDate;
          const parsedDiv = Date.parse(d);

          if (parsedDiv) {
            const key = d.slice(0, 10);
            if (!dates[key]) {
              dates[key] = {
                day: key,
                value: 0,
                data: []
              };
            }

            dates[key].value += 1;
            dates[key].data.push(position.ticker);
          }
        });
      }
    }
  }

  return Object.values(dates);
};

const getPortfolioNames = (portfolios?: DividendResp[], enabledAccounts?: EnabledAccounts) => {
  const portfolioNames: string[] = [];

  if (!portfolios || portfolios.length < 1) {
    return portfolioNames;
  }

  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    portfolioNames.push(portfolio.accountName);
  }

  return portfolioNames;
};

const getMonthlyDividend = (portfolios?: DividendResp[], enabledAccounts?: EnabledAccounts) => {
  let monthlyDividends: { [key: string]: string | number }[] = [];

  if (!portfolios || portfolios.length < 1) {
    return monthlyDividends;
  }

  if (enabledAccounts && Object.values(enabledAccounts).every((val) => val === false)) {
    return monthlyDividends;
  }

  const currUTCYear = new Date().getUTCFullYear();
  monthlyDividends = MONTH_SHORT_NAMES.map<{ [key: string]: string | number }>((monthName) => ({ monthName }));

  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    for (const position of portfolio.positions) {
      const dividends = position.dividends;

      if (dividends) {
        Object.values(dividends).forEach((dividend) => {
          const day = dividend.payableDate ?? dividend.exDividendDate ?? dividend.recordDate;
          const parseDay = Date.parse(day);

          if (parseDay) {
            const parsedUTCYear = new Date(parseDay).getUTCFullYear();
            if (parsedUTCYear === currUTCYear) {
              const monthIndex = new Date(parseDay).getUTCMonth();

              if (monthlyDividends[monthIndex][portfolio.accountName] == null) {
                monthlyDividends[monthIndex][portfolio.accountName] = 0;
              }

              monthlyDividends[monthIndex][portfolio.accountName] =
                (monthlyDividends[monthIndex][portfolio.accountName] as number) + position.shares * dividend.amount;
            }
          }
        });
      }
    }
  }

  return monthlyDividends;
};
