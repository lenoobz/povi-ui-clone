import { Actions } from 'consts/action.enum';
import React, { useContext } from 'react';
import { GlobalContext, GlobalContextType } from 'stores/contexts/GlobalContext';

type PageAlertProps = {};

export const PageAlert: React.FC<PageAlertProps> = () => {
  const [ctx, dispatch]: GlobalContextType = useContext(GlobalContext);

  const onCloseAlert = () => {
    dispatch({
      type: Actions.REMOVE_PAGE_ALERT
    });
  };

  const { pageAlert: alert, isFetching } = ctx;
  if (!alert || isFetching) {
    return null;
  }

  let color = 'w3-blue-gray';
  if (alert.type === 'DANGER') {
    color = 'w3-blue-gray';
  } else if (alert.type === 'WARN') {
    color = 'w3-blue-gray';
  } else if (alert.type === 'SUCCESS') {
    color = 'w3-blue-gray';
  }

  return (
    <div className="w3-container page-alert">
      <div className={`w3-panel w3-display-container w3-card w3-round-large ${color}`}>
        <span className="w3-button w3-large w3-display-topright w3-round-large close-button" onClick={onCloseAlert}>
          ×
        </span>
        <h3>{alert.title}</h3>
        <p>{alert.message}</p>
      </div>
    </div>
  );
};
