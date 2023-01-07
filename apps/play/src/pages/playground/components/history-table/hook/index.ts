import { Result } from '@rang/shared/common-models';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';

interface HistoryData {
  id: number;
  name: string;
}

export const historyTableHook = (data: Result[]) => {
  const columns = useMemo<Column<Result>[]>(
    () => [
      {
        Header: 'Result Id',
        accessor: (rowItem) => rowItem.id,
      },
      {
        Header: 'Result Number',
        accessor: (rowItem) => rowItem?.resultNumber,
      },
      {
        Header: 'Result Color',
        accessor: (rowItem) => rowItem?.resultColor,
      },
      {
        Header: 'Time',
        accessor: (rowItem) => rowItem?.createdAt,
      },
    ],
    []
  );
  const tableInstance = useTable<Result>({
    columns,
    data,
  });
  const { headerGroups, rows, prepareRow } = tableInstance;
  return { headerGroups, rows, prepareRow };
};
