import { socketInstance } from 'libs/shared/common-models/src';
export const getTimer = () => {
  socketInstance.on('timer', (e) => console.log('ok', e));
};

export const TestEvent = () => {
  socketInstance.emit('events', { name: 'Nest Dhruc' });
};
