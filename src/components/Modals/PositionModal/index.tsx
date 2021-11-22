import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import './style.css';

type PositionModalProps = {
  accountId: string;
  showModal?: boolean;
  selectedTicker?: string;
  selectedTickerName?: string;
  selectedNumShares?: number;
  onAdd?: (accountId: string, ticker: string, numShares: number) => void;
  onEdit?: (accountId: string, ticker: string, numShares: number) => void;
  onClose?: () => void;
};

export const PositionModal: React.FC<PositionModalProps> = ({
  showModal,
  accountId,
  selectedTicker,
  selectedTickerName,
  selectedNumShares,
  onAdd,
  onEdit,
  onClose
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [ticker, setTicker] = useState<string | undefined>();
  const [tickerName, setTickerName] = useState<string | undefined>();
  const [numShares, setNumShares] = useState<number | undefined>();

  useEffect(() => {
    if (selectedTicker) {
      setTicker(selectedTicker);
      setTickerName(selectedTickerName);
      setIsEdit(true);
    }
  }, [selectedTicker, selectedTickerName]);

  useEffect(() => {
    if (selectedNumShares) {
      setNumShares(selectedNumShares);
    }
  }, [selectedNumShares]);

  const onChangeShares = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedNum = parseFloat(e.target.value);
    if (isNaN(parsedNum)) {
      setNumShares(undefined);
    } else {
      setNumShares(parsedNum);
    }
  };

  const onSelectStock = (value: any) => {
    setTicker(value);
  };

  const onSaveModal = (e: MouseEvent) => {
    if (isEdit) {
      onEdit && onEdit(accountId, ticker ?? '', numShares ?? 0);
    } else {
      onAdd && onAdd(accountId, ticker ?? '', numShares ?? 0);
    }

    setIsEdit(false);
    setTicker(undefined);
    setTickerName(undefined);
    setNumShares(undefined);
    onClose && onClose();
  };

  const onCloseModal = (e: MouseEvent) => {
    setIsEdit(false);
    setTicker(undefined);
    setTickerName(undefined);
    setNumShares(undefined);
    onClose && onClose();
  };

  let stockInput;
  if (isEdit) {
    stockInput = <input className="w3-input w3-border numShares" value={`${ticker} - ${tickerName}`} disabled />;
  } else {
    stockInput = (
      <SelectSearch
        search
        options={[]}
        filterOptions={(options) => {
          const filter = fuzzySearch(options);
          return (q) => filter(q).slice(0, 8);
        }}
        getOptions={(query) => {
          return new Promise((resolve, reject) => {
            if (!query || query.length < 2) {
              resolve([]);
            } else {
              fetch(`https://dev-api.lenoob.com/v1/assets/${query}`)
                .then((response) => response.json())
                .then((assetSummary) => {
                  resolve(
                    assetSummary?.map((asset: any) => {
                      return { name: `${asset.ticker} - ${asset.name}`, value: asset.ticker };
                    })
                  );
                })
                .catch(reject);
            }
          });
        }}
        // emptyMessage="Not found"
        placeholder="Search Stock for Portofio"
        onChange={onSelectStock}
        disabled={isEdit}
        value={ticker}
      />
    );
  }

  if (!showModal) {
    return null;
  }

  return (
    <div className="w3-modal position-modal" style={{ display: 'block' }}>
      <div className="w3-modal-content w3-round-large w3-card w3-animate-zoom" style={{ maxWidth: '480px' }}>
        <div className="w3-center">
          <br />
          <span className="w3-button w3-display-topright" title="Close Modal" onClick={onCloseModal}>
            &times;
          </span>
        </div>

        <div className="w3-container">
          <div className="w3-section">
            <label>
              <b>Stock</b>
            </label>
            {stockInput}
            <br />
            <label>
              <b>Shares</b>
            </label>
            <input
              className="w3-input w3-border numShares"
              type="number"
              min={0}
              placeholder="Enter Number Of Shares"
              value={numShares ?? ''}
              onChange={onChangeShares}
              required
            />
            <button
              className="w3-button w3-round-small w3-block w3-section save-button"
              disabled={!ticker || !numShares || numShares <= 0 || !Number.isInteger(numShares)}
              onClick={onSaveModal}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
