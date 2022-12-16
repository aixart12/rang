import io from 'socket.io-client';
import { serverUrl } from './urls.config';

export const socketInstance = io(serverUrl);
