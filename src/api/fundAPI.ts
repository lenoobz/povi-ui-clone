import config from 'configs/app.config';
import { EnabledAccounts, UserDetails, Accounts, AccountInfo, PositionInfo } from 'types';

const baseUrl = config.API_BASE_URL;

export const getAccounts = async (userId: string): Promise<Accounts | undefined> => {
  const url = `${baseUrl}/accounts/${userId}`;

  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    if (data && data.length < 1) {
      return;
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const addAccount = async (createdBy: string, accountName: string): Promise<AccountInfo> => {
  const url = `${baseUrl}/account`;

  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ createdBy, name: accountName })
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const updateAccount = async (
  accountId: string,
  createdBy: string,
  accountName: string
): Promise<AccountInfo> => {
  const url = `${baseUrl}/account`;

  const settings = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: accountId, createdBy, name: accountName })
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteAccount = async (id: string, createdBy: string): Promise<Accounts | undefined> => {
  const url = `${baseUrl}/account`;

  const settings = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, createdBy })
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    if (data && data.length < 1) {
      return;
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const addPosition = async (
  accountId: string,
  createdBy: string,
  ticker: string,
  shares: number
): Promise<PositionInfo[] | undefined> => {
  const url = `${baseUrl}/position`;

  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ accountId, createdBy, ticker, shares })
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    if (data && data.length < 1) {
      return;
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const updatePosition = async (
  accountId: string,
  createdBy: string,
  ticker: string,
  shares: number
): Promise<PositionInfo[] | undefined> => {
  const url = `${baseUrl}/position`;

  const settings = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ accountId, createdBy, ticker, shares })
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const deletePosition = async (
  accountId: string,
  createdBy: string,
  ticker: string
): Promise<PositionInfo[] | undefined> => {
  const url = `${baseUrl}/position`;

  const settings = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ accountId, createdBy, ticker })
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    if (data && data.length < 1) {
      return;
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const saveEnabledAccounts = (enabledAccounts?: EnabledAccounts) => {
  const storage = window.localStorage;

  if (!enabledAccounts) {
    return;
  }

  try {
    storage.setItem('enabledAccounts', JSON.stringify(enabledAccounts));
  } catch (error) {
    console.error('Save enabled accounts failed', error);
  }
};

export const loadEnabledAccounts = (): EnabledAccounts | undefined => {
  const storage = window.localStorage;
  try {
    const enabledAccounts = storage.getItem('enabledAccounts');

    if (enabledAccounts) {
      return JSON.parse(enabledAccounts);
    }
  } catch (error) {
    console.error('Load enabled accounts failed', error);
  }
};

export const saveUserDetails = (userDetails?: UserDetails) => {
  const storage = window.localStorage;

  if (!userDetails) {
    return;
  }

  try {
    storage.setItem('userDetails', JSON.stringify(userDetails));
  } catch (error) {
    console.error('Save user details failed', error);
  }
};

export const deleteUserDetails = () => {
  const storage = window.localStorage;
  storage.removeItem('userDetails');
};

export const saveJwtToken = (jwtToken?: string) => {
  const storage = window.localStorage;

  if (!jwtToken) {
    return;
  }

  try {
    storage.setItem('jwtToken', jwtToken);
  } catch (error) {
    console.error('Save jwt token failed', error);
  }
};

export const deleteJwtToken = () => {
  const storage = window.localStorage;
  storage.removeItem('jwtToken');
};

export const loadJwtToken = (): string | undefined => {
  const storage = window.localStorage;
  try {
    const jwtToken = storage.getItem('jwtToken');

    if (jwtToken) {
      return jwtToken;
    }
  } catch (error) {
    console.error('Load jwt token failed', error);
  }
};

export const getPortfolios = async (userId: string): Promise<any | undefined> => {
  const url = `${baseUrl}/portfolios/${userId}`;

  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    if (data && data.length < 1) {
      return;
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getBreakdowns = async (userId: string): Promise<any | undefined> => {
  const url = `${baseUrl}/breakdowns/${userId}`;

  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    if (data && data.length < 1) {
      return;
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getDividends = async (userId: string): Promise<any | undefined> => {
  const url = `${baseUrl}/dividends/${userId}`;

  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  try {
    const resp = await fetch(url, settings);
    const data = await resp.json();

    if (data && data.length < 1) {
      return;
    }

    return data;
  } catch (err) {
    throw err;
  }
};
