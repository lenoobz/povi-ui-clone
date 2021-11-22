import React, { MouseEvent, useCallback } from 'react';

type TableProps = {
  className?: string;
  columns: {
    id: string;
    title?: string;
    style?: any;
    className?: string;
    onClick?: (data: any) => void;
  }[];
  data?: { [id: string]: any }[];
  onClick?: (data: any) => void;
};

export const Table: React.FC<TableProps> = ({ className, columns, data, onClick }) => {
  if (!data || data.length < 1 || !columns || columns.length < 1) {
    return null;
  }

  return (
    <table className={`w3-table w3-bordered ${className}`}>
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} onClick={onClick} />
    </table>
  );
};

type TableHeaderProps = {
  columns: {
    id: string;
    title?: string;
    style?: any;
    className?: string;
    onClick?: (data: any) => void;
  }[];
};

export const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  if (!columns || columns.length < 1) {
    return null;
  }

  const cells = columns.map((c, i) => {
    return <TableHeaderCell key={c.id} id={c.id} style={c.style} className={c.className} title={c.title} />;
  });

  return (
    <thead>
      <tr>{cells}</tr>
    </thead>
  );
};

type TableHeaderCellProps = {
  id: string;
  style?: any;
  title?: string;
  className?: string;
};

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ id, title, style, className }) => {
  return (
    <th style={style} className={className}>
      {title}
    </th>
  );
};

type TableBodyProps = {
  columns: {
    id: string;
    title?: string;
    style?: any;
    className?: string;
    onClick?: (data: any) => void;
  }[];
  data: { [id: string]: any }[];
  onClick?: (data: any) => void;
};

export const TableBody: React.FC<TableBodyProps> = ({ columns, data, onClick }) => {
  if (!data || data.length < 1 || !columns || columns.length < 1) {
    return null;
  }

  const rows = data.map((d, i) => {
    return <TableBodyRow key={i} columns={columns} data={d} onClick={onClick} />;
  });

  return <tbody>{rows}</tbody>;
};

type TableBodyRowProps = {
  columns: {
    id: string;
    title?: string;
    style?: any;
    className?: string;
    onClick?: (data: any) => void;
  }[];
  data: { [id: string]: any };
  onClick?: (data: any) => void;
};

export const TableBodyRow: React.FC<TableBodyRowProps> = ({ columns, data, onClick }) => {
  const onClickRow = useCallback(() => {
    onClick && onClick(data);
  }, [onClick, data]);

  const cells = columns.map((column, i) => {
    return <TableBodyCell key={i} column={column} data={data} />;
  });

  return <tr onClick={onClickRow}>{cells}</tr>;
};

type TableBodyCellProps = {
  column: {
    id: string;
    title?: string;
    style?: any;
    className?: string;
    onClick?: (data: any) => void;
  };
  data: { [id: string]: any };
};

export const TableBodyCell: React.FC<TableBodyCellProps> = ({ column, data }) => {
  const { id, style, className, onClick } = column;

  const onClickCell = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onClick && onClick(data);
    },
    [onClick, data]
  );

  const cell = onClick ? (
    <button className="w3-button w3-ripple" onClick={onClickCell}>
      <i className="fa fa-trash" />
    </button>
  ) : (
    <span>{data[id]}</span>
  );

  return (
    <td style={style} className={className}>
      {cell}
    </td>
  );
};
