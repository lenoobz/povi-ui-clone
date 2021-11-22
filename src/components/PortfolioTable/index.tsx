import React, { useCallback } from 'react';
import { Table } from 'components/Table';
import { NoData } from 'components/NoData';
import { TableLoader } from 'components/Skeletons/Table';
import { Container, ContainerBody } from 'components/Container';

type PortfolioTableProps = {
  id: string;
  title?: string;
  data?: {
    ticker: string;
    shares: number;
    name: string;
    price: number;
    currency: string;
  }[];
  isLoading?: boolean;
  className?: string;
  onDelete?: (id: string, data: any) => void;
  onClick?: (id: string, data: any) => void;
  action?: {
    label: string;
    onClick?: (data: any) => void;
  };
};

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  id,
  data,
  isLoading,
  className,
  onDelete,
  onClick,
  title,
  action
}) => {
  const onDeleteRow = useCallback(
    (data: any) => {
      onDelete && onDelete(id, data);
    },
    [onDelete, id]
  );

  const onClickRow = useCallback(
    (data: any) => {
      onClick && onClick(id, data);
    },
    [onClick, id]
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableLoader />
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

  return (
    <Container title={title} action={action}>
      <ContainerBody>
        <Table
          className={className}
          columns={[
            { id: 'ticker', title: 'Ticker' },
            {
              id: 'name',
              title: 'Name',
              className: 'w3-hide-small'
            },
            { id: 'shares', title: 'Shares' },
            { id: 'price', title: 'Prices' },
            { id: 'delete', onClick: onDeleteRow }
          ]}
          data={data}
          onClick={onClickRow}
        />
      </ContainerBody>
    </Container>
  );
};
