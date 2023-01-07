import {
  socketInstance,
  SocketTimerInterface,
} from 'libs/shared/common-models/src';
export const getTimer = (callback: (data: SocketTimerInterface) => void) => {
  socketInstance.on('timer', callback);
};
export const getLatestResult = (
  callback: (data: SocketTimerInterface) => void
) => {
  socketInstance.on('latest-result', callback);
};

export const TestEvent = () => {
  socketInstance.emit('events', { name: 'Nest Dhruc' });
};
