import { SocketTimerInterface } from '@rang/shared/common-models';
import { getTimer } from 'apps/play/src/apis/socketIo/timerSocketIo';
import { useCallback, useEffect, useState } from 'react';

export const TimerHook = () => {
  const [getTime, setGetTime] = useState<SocketTimerInterface>();
  const handleTimer = useCallback((data: any) => {
    setGetTime(data);
  }, []);
  useEffect(() => {
    getTimer(handleTimer);
  }, [true]);
  return getTime;
};
