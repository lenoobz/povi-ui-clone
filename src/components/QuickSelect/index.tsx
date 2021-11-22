import { Actions } from 'consts/action.enum';
import React, { useContext } from 'react';
import SelectSearch, { SelectSearchOption } from 'react-select-search';
import { GlobalContext, GlobalContextType } from 'stores/contexts/GlobalContext';

type QuickSelectProps = {};

export const QuickSelect: React.FC<QuickSelectProps> = () => {
  const [ctx, dispatch]: GlobalContextType = useContext(GlobalContext);
  const { accounts, enabledAccounts } = ctx;

  const toggleViewAccount = (selectedIds: any) => {
    if (!accounts || accounts.length < 1) {
      return;
    }

    const newEnabledAccounts: { [id: string]: boolean } = {};
    accounts.forEach((account) => {
      newEnabledAccounts[account.id] = false;
    });

    selectedIds.forEach((id: string) => {
      newEnabledAccounts[id] = true;
    });

    dispatch({ type: Actions.START_FETCHING });

    try {
      dispatch({
        type: Actions.UPDATE_ENABLED_ACCOUNTS_REQUEST_SUCCESS,
        payload: { enabledAccounts: newEnabledAccounts }
      });
    } catch (err) {
      dispatch({ type: Actions.ERROR_FETCHING });
    } finally {
      dispatch({ type: Actions.FINISH_FETCHING });
    }
  };

  const enabledAccountIds = Object.keys(enabledAccounts ?? {}).filter((key) => enabledAccounts?.[key]);

  let accountOptions: SelectSearchOption[] = [];
  if (accounts && accounts.length > 0) {
    accountOptions = accounts.map((account) => ({
      value: account.id,
      name: account.name ?? 'No name'
    }));
  }

  return (
    <div className="w3-right quick-select">
      <span className="quick-select-label">Accounts</span>
      <SelectSearch
        options={accountOptions}
        multiple
        printOptions="on-focus"
        placeholder="Select accounts"
        value={enabledAccountIds}
        onChange={toggleViewAccount}
      />
    </div>
  );
};
