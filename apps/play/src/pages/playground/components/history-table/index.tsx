import { FC, useMemo } from 'react';
import { historyTableHook } from './hook';

import { CustomTable } from 'libs/shared/common-react-models/src';

interface HistoryData {
  id: number;
  name: string;
}

interface HistoryTablePops {
  data: HistoryData[];
}

export const HistoryTable: FC<HistoryTablePops> = ({ data }) => {
  const { headerGroups, rows, prepareRow } = historyTableHook(data || []);

  const UserTable = useMemo(() => CustomTable<HistoryData>(), []);
  return (
    <UserTable
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
    />
  );
};
