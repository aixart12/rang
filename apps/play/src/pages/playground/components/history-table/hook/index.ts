import { useMemo } from 'react';
import { Column, useTable } from 'react-table';

interface HistoryData {
  id: number;
  name: string;
}

export const historyTableHook = (data: HistoryData[]) => {
  const columns = useMemo<Column<HistoryData>[]>(
    () => [
      {
        Header: 'Employee Id',
        accessor: (rowItem) => rowItem.id,
      },
      {
        Header: 'Name',
        accessor: (rowItem) => rowItem?.name,
      },
    ],
    []
  );
  const tableInstance = useTable<HistoryData>({
    columns,
    data,
  });
  const { headerGroups, rows, prepareRow } = tableInstance;
  return { headerGroups, rows, prepareRow };
};
