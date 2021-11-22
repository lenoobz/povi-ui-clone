import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

type AccountModalProps = {
  showModal?: boolean;
  accountId?: string;
  accountName?: string;
  onCreate?: (accountName: string) => void;
  onEdit?: (accountId: string, accountName: string) => void;
  onClose?: () => void;
};

export const AccountModal: React.FC<AccountModalProps> = ({
  showModal,
  accountId,
  accountName,
  onEdit,
  onClose,
  onCreate
}) => {
  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    setName(accountName);
  }, [accountName]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const onSaveModal = (e: MouseEvent) => {
    if (accountId) {
      onEdit && onEdit(accountId, name ?? '');
    } else {
      onCreate && onCreate(name ?? '');
    }

    setName(undefined);
    onClose && onClose();
  };

  const onCloseModal = (e: MouseEvent) => {
    setName(undefined);
    onClose && onClose();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="w3-modal account-modal" style={{ display: 'block' }}>
      <div className="w3-modal-content w3-round-large w3-card w3-animate-zoom" style={{ maxWidth: '480px' }}>
        <div className="w3-center">
          <br />
          <span className="w3-button w3-display-topright" title="Close" onClick={onCloseModal}>
            &times;
          </span>
        </div>

        <div className="w3-container">
          <div className="w3-section">
            <label>
              <b>Account Name</b>
            </label>
            <input
              className="w3-input w3-border numShares"
              type="text"
              placeholder="Enter Account Name"
              value={name ?? ''}
              onChange={onChangeName}
              required
            />
            <button className="w3-button w3-round-small w3-block w3-section" disabled={!name} onClick={onSaveModal}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
