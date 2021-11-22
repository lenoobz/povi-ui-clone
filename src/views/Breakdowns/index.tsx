import React, { useContext, useEffect, useState } from 'react';
import percentRound from 'percent-round';
import { AccountStats } from 'components/AccountStats';
import { AssetAllocation } from 'components/Charts/AssetAllocation';
import { CountryBreakdown } from 'components/Charts/CountryBreakdown';
import { SectorBreakdown } from 'components/Charts/SectorBreakdown';
import { GlobalContext, GlobalContextType } from 'stores/contexts/GlobalContext';
import { BreakdownResp, EnabledAccounts } from 'types';
import { DashboardLayout } from 'layouts/Dashboard';
import { getBreakdowns } from 'api/fundAPI';
import TypeCodes from 'consts/type-codes.json';
import SectorCodes from 'consts/sector-codes.json';
import CountryCodes from 'consts/country-codes.json';
import { Actions } from 'consts/action.enum';

export const Breakdowns: React.FC = () => {
  const [breakdowns, setBreakdowns] = useState<BreakdownResp[] | undefined>();
  const [ctx, dispatch]: GlobalContextType = useContext(GlobalContext);

  const { isFetching, enabledAccounts, userDetails } = ctx;

  useEffect(() => {
    const fetchBreakdowns = async (userId: string) => {
      try {
        dispatch({ type: Actions.START_FETCHING });
        const resp = await getBreakdowns(userId);
        setBreakdowns(resp);
      } catch (error) {
        dispatch({ type: Actions.ERROR_FETCHING });
      } finally {
        dispatch({ type: Actions.FINISH_FETCHING });
      }
    };

    if (userDetails) {
      fetchBreakdowns(userDetails.sub);
    }
  }, [userDetails, dispatch]);

  const totalValue = getTotalValue(breakdowns, enabledAccounts);
  const assetBreakdowns = getAssetBreakdowns(breakdowns, enabledAccounts);
  const sectorBreakdowns = getSectorBreakdowns(breakdowns, enabledAccounts);
  const countryBreakdowns = getCountryBreakdowns(breakdowns, enabledAccounts);

  return (
    <DashboardLayout>
      <div className="w3-row">
        <div className="w3-container w3-margin-top w3-margin-bottom">
          <AccountStats isLoading={isFetching} name={userDetails?.name} value={totalValue} />
        </div>
      </div>
      <div className="w3-row">
        <div className="w3-third">
          <AssetAllocation isLoading={isFetching} data={assetBreakdowns} />
          <SectorBreakdown isLoading={isFetching} data={sectorBreakdowns} />
        </div>

        <div className="w3-twothird">
          <CountryBreakdown isLoading={isFetching} data={countryBreakdowns} />
        </div>
      </div>
    </DashboardLayout>
  );
};

const typeCodesHash = (() => {
  const hash: any = {};

  TypeCodes.forEach((c: any) => {
    hash[c.code.trim().toLowerCase()] = c.name.trim();
  });

  return hash;
})();

const getTypeName = (typeCode: string): string => {
  return typeCodesHash[typeCode.trim().toLowerCase()] ?? 'Other';
};

const getTotalValue = (portfolios?: BreakdownResp[], enabledAccounts?: EnabledAccounts) => {
  let total = 0;

  if (!portfolios || portfolios.length < 1) {
    return total;
  }

  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    for (const position of portfolio.positions) {
      total += position.shares * position.price;
    }
  }

  return total;
};

const getAssetBreakdowns = (portfolios?: BreakdownResp[], enabledAccounts?: EnabledAccounts) => {
  const breakdowns: { id: string; name: string; value: number }[] = [];

  if (!portfolios || portfolios.length < 1) {
    return breakdowns;
  }

  const assetClassValues: { [className: string]: number } = {
    bond: 0,
    equity: 0,
    cash: 0,
    crypto: 0
  };

  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    for (const position of portfolio.positions) {
      const positionValue = position.shares * position.price;
      assetClassValues.cash += positionValue * (position.allocationCash ?? 0);
      assetClassValues.bond += positionValue * (position.allocationBond ?? 0);
      assetClassValues.equity += positionValue * (position.allocationStock ?? 0);
    }
  }

  const classNames = Object.keys(assetClassValues);
  const classValues = Object.values(assetClassValues);
  const assetPercents = percentRound(classValues, 2);
  for (let i = 0; i < classNames.length; i++) {
    const typeName = getTypeName(classNames[i]);
    breakdowns.push({
      id: typeName,
      name: typeName,
      value: assetPercents[i]
    });
  }

  return breakdowns.filter((d) => d.value > 0).sort((x, y) => x.value - y.value);
};

const sectorCodesHash = (() => {
  const hash: any = {};

  SectorCodes.forEach((c: any) => {
    hash[c.code.trim().toLowerCase()] = c.name.trim();
  });

  return hash;
})();

const getSectorName = (sectorCode: string): string => {
  return sectorCodesHash[sectorCode.trim().toLowerCase()] ?? 'Other';
};

const getSectorBreakdowns = (portfolios?: BreakdownResp[], enabledAccounts?: EnabledAccounts) => {
  const breakdowns: { id: string; name: string; value: number }[] = [];

  if (!portfolios || portfolios.length < 1) {
    return breakdowns;
  }

  const sectorValues: { [sectorCode: string]: number } = {};
  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    for (const position of portfolio.positions) {
      const positionValue = position.shares * position.price;

      position.sectors.forEach((sector) => {
        const code = sector.sectorCode;
        const percent = sector.fundPercent ?? 0;

        if (!sectorValues[code]) {
          sectorValues[code] = 0;
        }

        sectorValues[code] = sectorValues[code] + (positionValue * percent) / 100;
      });
    }
  }

  const sectorCodes = Object.keys(sectorValues);
  const sectorNames = sectorCodes.map(getSectorName);
  const sectorPercents = percentRound(Object.values(sectorValues), 2);

  return sectorCodes
    .map((code, i) => ({
      id: sectorNames[i],
      name: sectorNames[i],
      value: sectorPercents[i]
    }))
    .filter((d) => d.value > 0)
    .sort((x, y) => x.value - y.value);
};

const countryCodesHash = (() => {
  const hash: any = {};

  CountryCodes.forEach((c: any) => {
    hash[c.alpha3Code.trim().toLowerCase()] = c.name.trim();
  });

  return hash;
})();

export const getCountryName = (countryCode: string): string => {
  return countryCodesHash[countryCode.trim().toLowerCase()] ?? 'Unknown';
};

const getCountryBreakdowns = (portfolios?: BreakdownResp[], enabledAccounts?: EnabledAccounts) => {
  const breakdowns: { id: string; name: string; value: number }[] = [];

  if (!portfolios || portfolios.length < 1) {
    return breakdowns;
  }

  const countryValues: { [countryCode: string]: number } = {};
  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    for (const position of portfolio.positions) {
      const positionValue = position.shares * position.price;

      position.countries.forEach((country) => {
        const code = country.countryCode;
        const percent = country.fundMktPercent ?? 0;

        if (!countryValues[code]) {
          countryValues[code] = 0;
        }

        countryValues[code] = countryValues[code] + (positionValue * percent) / 100;
      });
    }
  }

  const countryCodes = Object.keys(countryValues);
  const countryNames = countryCodes.map(getCountryName);
  const countryPercents = percentRound(Object.values(countryValues), 2);

  return countryCodes
    .map((code, i) => ({
      id: code,
      name: countryNames[i],
      value: countryPercents[i]
    }))
    .filter((d) => d.value > 0)
    .sort((x, y) => x.value - y.value);
};
