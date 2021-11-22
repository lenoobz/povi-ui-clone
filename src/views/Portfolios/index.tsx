import React, { useCallback, useContext, useEffect, useState } from 'react';
import percentRound from 'percent-round';
import {
  addAccount,
  addPosition,
  deleteAccount,
  deletePosition,
  getPortfolios,
  updateAccount,
  updatePosition
} from 'api/fundAPI';
import { DashboardLayout } from 'layouts/Dashboard';
import { GlobalContext } from 'stores/contexts/GlobalContext';
import { GlobalContextType } from 'stores/contexts/GlobalContext';
import { AccountStats } from 'components/AccountStats';
import { Accounts, EnabledAccounts, PortfolioResp } from 'types';
import { AccountBreakdown } from 'components/Charts/AccountBreakdown';
import { AccountList } from 'components/AccountList';
import { Actions } from 'consts/action.enum';
import { AccountModal } from 'components/Modals/AccountModal';
import { PositionModal } from 'components/Modals/PositionModal';
import { PortfolioTable } from 'components/PortfolioTable';

export const Portfolios: React.FC = () => {
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [selectedAccountName, setSelectedAccountName] = useState('');
  const [selectedTicker, setSelectedTicker] = useState<string | undefined>();
  const [selectedTickerName, setSelectedTickerName] = useState<string | undefined>();
  const [selectedNumShares, setSelectedNumShares] = useState<number | undefined>();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [portfolios, setPortfolios] = useState<PortfolioResp[] | undefined>();
  const [ctx, dispatch]: GlobalContextType = useContext(GlobalContext);
  const { isFetching, accounts, userDetails, enabledAccounts } = ctx;

  useEffect(() => {
    const fetchPortfolios = async (userId: string) => {
      try {
        dispatch({ type: Actions.START_FETCHING });
        const resp = await getPortfolios(userId);
        setPortfolios(resp);
      } catch (error) {
        dispatch({ type: Actions.ERROR_FETCHING });
      } finally {
        dispatch({ type: Actions.FINISH_FETCHING });
      }
    };

    if (userDetails) {
      fetchPortfolios(userDetails.sub);
    }
  }, [accounts, userDetails, dispatch]);

  const onOpenAccountModal = useCallback(
    (id?: string) => {
      if (id) {
        const selectedAccount = portfolios?.find((portfolio) => portfolio.accountId === id);
        setSelectedAccountName(selectedAccount?.accountName ?? '');
      }

      setSelectedAccountId(id ?? '');
      setShowAccountModal(true);
    },
    [portfolios, setSelectedAccountId, setSelectedAccountName, setShowAccountModal]
  );

  const onCloseAccountModal = useCallback(() => {
    setSelectedAccountId('');
    setSelectedAccountName('');
    setShowAccountModal(false);
  }, [setShowAccountModal]);

  const onCreateAccount = async (accountName: string) => {
    if (!accountName?.trim()) {
      throw Error('account name is required');
    }

    if (!userDetails?.sub) {
      throw Error('sub is required');
    }

    dispatch({ type: Actions.START_FETCHING });

    try {
      const newAccounts = accounts && accounts.length > 0 ? [...accounts] : [];
      const account = await addAccount(userDetails.sub, accountName?.trim());

      newAccounts.push(account);
      dispatch({
        type: Actions.CREATE_ACCOUNT_REQUEST_SUCCESS,
        payload: {
          accounts: newAccounts,
          enabledAccounts: { [account.id]: true }
        }
      });
    } catch (err) {
      dispatch({ type: Actions.ERROR_FETCHING });
    } finally {
      dispatch({ type: Actions.FINISH_FETCHING });
    }
  };

  const onEditAccount = async (accountId: string, accountName: string) => {
    if (!accountName?.trim()) {
      throw Error('account name is required');
    }

    if (!userDetails?.sub) {
      throw Error('sub is required');
    }

    dispatch({ type: Actions.START_FETCHING });

    try {
      const updatedAccount = await updateAccount(accountId, userDetails.sub, accountName?.trim());

      let newAccounts: Accounts = [];
      if (accounts && accounts.length > 0) {
        newAccounts = accounts.map((account) => {
          if (account.id === accountId) {
            return updatedAccount;
          }

          return account;
        });
      }

      dispatch({
        type: Actions.EDIT_ACCOUNT_REQUEST_SUCCESS,
        payload: {
          accounts: newAccounts
        }
      });
    } catch (err) {
      dispatch({ type: Actions.ERROR_FETCHING });
    } finally {
      dispatch({ type: Actions.FINISH_FETCHING });
    }
  };

  const onDeleteAccount = async (accountId: string) => {
    if (!userDetails) {
      return;
    }

    dispatch({ type: Actions.START_FETCHING });

    try {
      const newAccounts = await deleteAccount(accountId, userDetails.sub);
      const newEnabledAccounts = { ...enabledAccounts };

      delete newEnabledAccounts[accountId];

      dispatch({
        type: Actions.DELETE_ACCOUNT_REQUEST_SUCCESS,
        payload: {
          accounts: newAccounts,
          enabledAccounts: newEnabledAccounts
        }
      });
    } catch (err) {
      dispatch({ type: Actions.ERROR_FETCHING });
    } finally {
      dispatch({ type: Actions.FINISH_FETCHING });
    }
  };

  const onToggleAccountStatus = (accountId: string) => {
    dispatch({ type: Actions.START_FETCHING });

    try {
      const currVal = enabledAccounts?.[accountId] ?? false;
      dispatch({
        type: Actions.UPDATE_ENABLED_ACCOUNTS_REQUEST_SUCCESS,
        payload: { enabledAccounts: { [accountId]: !currVal } }
      });
    } catch (err) {
      dispatch({ type: Actions.ERROR_FETCHING });
    } finally {
      dispatch({ type: Actions.FINISH_FETCHING });
    }
  };

  const onOpenPositionModal = useCallback(
    (id: string, data?: any) => {
      setSelectedAccountId(id);
      setSelectedTicker(data?.ticker);
      setSelectedTickerName(data?.name);
      setSelectedNumShares(data?.shares);
      setShowPositionModal(true);
    },
    [setSelectedAccountId, setSelectedTicker, setSelectedTickerName, setSelectedNumShares, setShowPositionModal]
  );

  const onClosePositionModal = useCallback(() => {
    setSelectedAccountId('');
    setSelectedTicker(undefined);
    setSelectedTickerName(undefined);
    setSelectedNumShares(undefined);
    setShowPositionModal(false);
  }, [setSelectedAccountId, setSelectedTicker, setSelectedTickerName, setSelectedNumShares, setShowPositionModal]);

  const onAddPosition = async (accountId: string, ticker: string, numShares: number) => {
    if (!userDetails) {
      return;
    }
    if (ticker) {
      dispatch({ type: Actions.START_FETCHING });
      try {
        await addPosition(accountId, userDetails.sub, ticker, numShares ?? 0);
        const resp = await getPortfolios(userDetails.sub);
        setPortfolios(resp);
      } catch (err) {
        dispatch({ type: Actions.ERROR_FETCHING });
      } finally {
        dispatch({ type: Actions.FINISH_FETCHING });
      }
    }
  };

  const onEditPosition = async (accountId: string, ticker: string, numShares: number) => {
    if (!userDetails) {
      return;
    }
    if (ticker) {
      dispatch({ type: Actions.START_FETCHING });
      try {
        await updatePosition(accountId, userDetails.sub, ticker, numShares ?? 0);
        const resp = await getPortfolios(userDetails.sub);
        setPortfolios(resp);
      } catch (err) {
        dispatch({ type: Actions.ERROR_FETCHING });
      } finally {
        dispatch({ type: Actions.FINISH_FETCHING });
      }
    }
  };

  const onDeletePosition = async (accountId: string, data: any) => {
    if (!userDetails) {
      return;
    }
    dispatch({ type: Actions.START_FETCHING });
    try {
      const selectedTicker = data.ticker;
      await deletePosition(accountId, userDetails.sub, selectedTicker);
      const resp = await getPortfolios(userDetails.sub);
      setPortfolios(resp);
    } catch (err) {
      dispatch({ type: Actions.ERROR_FETCHING });
    } finally {
      dispatch({ type: Actions.FINISH_FETCHING });
    }
  };

  let portfolioTables = null;
  if (portfolios && portfolios.length > 0) {
    portfolioTables = portfolios.map((portfolio) => {
      const { accountId, accountName, positions } = portfolio;

      return (
        <PortfolioTable
          id={accountId}
          key={accountId}
          data={positions}
          title={accountName}
          isLoading={isFetching}
          className="portfolio-table"
          onDelete={onDeletePosition}
          onClick={(id, data) => onOpenPositionModal(id, data)}
          action={{ label: 'Add Position', onClick: () => onOpenPositionModal(accountId) }}
        />
      );
    });
  }

  const totalValue = getTotalValue(portfolios, enabledAccounts);
  const breakdowns = getBreakdowns(portfolios, enabledAccounts);
  const summaries = getAccountSummaries(portfolios, enabledAccounts);

  return (
    <DashboardLayout>
      <div className="w3-row">
        <div className="w3-container w3-margin-top w3-margin-bottom">
          <AccountStats isLoading={isFetching} name={userDetails?.name} value={totalValue} />
        </div>
      </div>
      <div className="w3-row">
        <div className="w3-third">
          <AccountBreakdown isLoading={isFetching} data={breakdowns} />
        </div>
        <div className="w3-twothird">
          <AccountList
            title="Accounts"
            data={summaries}
            isLoading={isFetching}
            onEdit={onOpenAccountModal}
            onDelete={onDeleteAccount}
            onToggle={onToggleAccountStatus}
            action={{ label: 'Add Account', onClick: () => onOpenAccountModal() }}
          />
          {portfolioTables}
        </div>
      </div>
      <AccountModal
        showModal={showAccountModal}
        accountId={selectedAccountId}
        accountName={selectedAccountName}
        onEdit={onEditAccount}
        onCreate={onCreateAccount}
        onClose={onCloseAccountModal}
      />
      <PositionModal
        showModal={showPositionModal}
        accountId={selectedAccountId}
        selectedTicker={selectedTicker}
        selectedTickerName={selectedTickerName}
        selectedNumShares={selectedNumShares}
        onAdd={onAddPosition}
        onEdit={onEditPosition}
        onClose={onClosePositionModal}
      />
    </DashboardLayout>
  );
};

const getTotalValue = (portfolios?: PortfolioResp[], enabledAccounts?: EnabledAccounts) => {
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

const getBreakdowns = (portfolios?: PortfolioResp[], enabledAccounts?: EnabledAccounts) => {
  const breakdowns: { id: string; name: string; value: number }[] = [];

  if (!portfolios || portfolios.length < 1) {
    return breakdowns;
  }

  const portfolioValues: number[] = [];
  for (const portfolio of portfolios) {
    if (!enabledAccounts?.[portfolio.accountId]) {
      continue;
    }

    let portfolioValue = 0;
    for (const position of portfolio.positions) {
      portfolioValue += position.shares * position.price;
    }

    portfolioValues.push(portfolioValue);
    breakdowns.push({
      id: portfolio.accountName,
      name: portfolio.accountName,
      value: 0
    });
  }

  const portfolioPercents = percentRound(portfolioValues, 2);
  for (let i = 0; i < breakdowns.length; i++) {
    breakdowns[i].value = portfolioPercents[i];
  }

  return breakdowns;
};

const getAccountSummaries = (portfolios?: PortfolioResp[], enabledAccounts?: EnabledAccounts) => {
  const summaries: { id: string; name: string; status: boolean; value: number; counter: number }[] = [];

  if (!portfolios || portfolios.length < 1) {
    return summaries;
  }

  for (const portfolio of portfolios) {
    let portfolioValue = 0;
    for (const position of portfolio.positions) {
      portfolioValue += position.shares * position.price;
    }

    summaries.push({
      id: portfolio.accountId,
      name: portfolio.accountName,
      value: portfolioValue,
      counter: portfolio.positions.length,
      status: !!enabledAccounts?.[portfolio.accountId]
    });
  }

  return summaries;
};
