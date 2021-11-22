import React, { useCallback } from 'react';
import { NoData } from 'components/NoData';
import { ListItemsLoader } from 'components/Skeletons/ListItems';
import { currencyFormat } from 'utils/format.utils';
import { Container, ContainerBody } from 'components/Container';

type AccountListProps = {
  isLoading?: boolean;
  data?: { id: string; name: string; status: boolean; value: number; counter: number }[];
  title?: string;
  action?: {
    label: string;
    onClick?: (data: any) => void;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
};

export const AccountList: React.FC<AccountListProps> = ({
  isLoading,
  data,
  title,
  action,
  onEdit,
  onDelete,
  onToggle
}) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ListItemsLoader />
      </div>
    );
  }

  if (!data || data.length < 1) {
    return (
      <Container title={title} action={action}>
        <ContainerBody>
          <NoData />
        </ContainerBody>
      </Container>
    );
  }

  const accountItems = data.map((account) => {
    const { id, name, status, value, counter } = account;

    return (
      <AccountListItem
        id={id}
        key={id}
        name={name}
        value={value}
        status={status}
        counter={counter}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );
  });

  return (
    <Container title={title} action={action}>
      <ContainerBody>
        <div className="account-list">{accountItems}</div>
      </ContainerBody>
    </Container>
  );
};

type AccountListItemProps = {
  id: string;
  name: string;
  value: number;
  status: boolean;
  counter: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
};

const AccountListItem: React.FC<AccountListItemProps> = ({
  id,
  name,
  value,
  status,
  counter,
  onEdit,
  onDelete,
  onToggle
}) => {
  const enableIcon = status ? 'fa-eye' : 'fa-eye-slash';
  const enableStyle = status ? '' : 'disabled';

  const onEditAccount = useCallback(() => {
    onEdit && onEdit(id);
  }, [onEdit, id]);

  const onDeleteAccount = useCallback(() => {
    onDelete && onDelete(id);
  }, [onDelete, id]);

  const onToggleAccount = useCallback(() => {
    onToggle && onToggle(id);
  }, [onToggle, id]);

  return (
    <div className="account-list-item">
      <button
        className="w3-button w3-ripple w3-right w3-xlarge account-list-item-button left-button"
        onClick={onToggleAccount}
      >
        <i className={`fa ${enableIcon}`} />
      </button>
      <div className={`account-list-item-body ${enableStyle}`} onClick={onEditAccount}>
        <p>
          <span className="w3-xlarge title">{name}</span>
          <span className="w3-medium sub-title w3-hide-small">{`${counter} positions`}</span>
        </p>
        <p className="push-right">
          <span className="w3-xlarge title">{currencyFormat.format(value)}</span>
        </p>
      </div>
      <button
        className="w3-button w3-ripple w3-right w3-xlarge account-list-item-button right-button"
        onClick={onDeleteAccount}
      >
        <i className="fa fa-trash" />
      </button>
    </div>
  );
};
