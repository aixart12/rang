import { FC, useMemo } from 'react';
import { historyTableHook } from './hook';
import { useQuery, useMutation } from 'react-query';

import { CustomTable } from 'libs/shared/common-react-models/src';
import { Result } from '@rang/shared/common-models';
import { result } from 'lodash';
import { getAllResults } from 'apps/play/src/apis/result.apis';
import { TimerHook } from '../../hook/timerHook';

export const HistoryTable: FC = () => {
  const { data: tableData, refetch } = useQuery<Result[]>('getResult', () =>
    getAllResults()
  );

  const getTime = TimerHook();
  if (getTime?.minutes === 0 && getTime.seconds === 0) {
    refetch();
  }
  const { headerGroups, rows, prepareRow } = historyTableHook(tableData || []);

  const UserTable = useMemo(() => CustomTable<Result>(), []);
  return (
    <UserTable
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
    />
  );
};
