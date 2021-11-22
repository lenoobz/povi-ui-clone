/******************************************************************************
 * Data type
 ******************************************************************************/

export type UserDetails = {
  sub: string;
  name: string;
  picture: string;
};

export type Accounts = AccountInfo[];

export type AccountInfo = {
  id: string;
  name: string;
  createdBy: string;
};

export type PositionInfo = {
  ticker: string;
  shares: number;
};

/******************************************************************************
 * UI type
 ******************************************************************************/

export type AppConfig = {
  [key: string]: string;
};

export type AlertInfo = {
  type: 'DANGER' | 'WARN' | 'SUCCESS' | 'INFO';
  title: string;
  message: string;
};

export type EnabledAccounts = {
  [accountId: string]: boolean;
};

export type PortfolioResp = {
  accountId: string;
  accountName: string;
  positions: {
    ticker: string;
    shares: number;
    name: string;
    price: number;
    currency: string;
  }[];
};

export type BreakdownResp = {
  accountId: string;
  accountName: string;
  positions: {
    ticker: string;
    shares: number;
    name: string;
    price: number;
    currency: string;
    allocationCash: number;
    allocationBond: number;
    allocationStock: number;
    sectors: {
      sectorCode: string;
      sectorName: string;
      fundPercent: number;
    }[];
    countries: {
      countryCode: string;
      countryName: string;
      holdingStatCode: string;
      fundMktPercent: number;
      fundTnaPercent: number;
    }[];
  }[];
};

export type DividendResp = {
  accountId: string;
  accountName: string;
  positions: {
    ticker: string;
    shares: number;
    name: string;
    price: number;
    currency: string;
    distAmount: number;
    dividendSchedule: string;
    dividends: {
      [timestamp: number]: {
        distDesc: string;
        distCode: string;
        yield: number;
        amount: number;
        exDividendDate: string;
        recordDate: string;
        payableDate: string;
      };
    };
  }[];
};
