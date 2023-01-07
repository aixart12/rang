import { Box, Flex, Spacer } from '@chakra-ui/react';
import {
  socketInstance,
  SocketTimerInterface,
} from '@rang/shared/common-models';
import {
  getLatestResult,
  getTimer,
  TestEvent,
} from 'apps/play/src/apis/socketIo/timerSocketIo';
import { FC, useCallback, useEffect, useState } from 'react';
import { TimerHook } from '../../hook/timerHook';

export const Timer: FC = () => {
  const getTime: SocketTimerInterface | undefined = TimerHook();

  return (
    <Flex>
      <Box p="4" bg="red.400">
        {getTime && getTime?.minutes} : {getTime && getTime?.seconds}
      </Box>
      <Spacer />
      <Box p="4" bg="green.400">
        Box 2
      </Box>
    </Flex>
  );
};
