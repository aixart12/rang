import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as moment from 'moment';

@WebSocketGateway({ cors: true })
export class TimerGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    console.log(data, 'socket');
    return data;
  }

  afterInit(server: any): any {
    console.log('init');
  }

  notifyAssemblyLineOnSetupChange(assemblyLineId: string) {
    this.server
      .to(`assemblyLine-${assemblyLineId}`)
      .emit('lineSetupChange', 'refetch');
  }

  countTime() {
    let fixTime = 120000;
    const interval = 1000;
    setInterval(() => {
      fixTime = fixTime - interval;
      let duration = moment.duration(fixTime, 'milliseconds');
      // console.log(duration.minutes()+ 'm:' + duration.seconds() + 's')
      if (fixTime == 0) {
        fixTime = 120000;
      }
      console.log({
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
      return this.server.sockets.emit('timer', {
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }, interval);
  }
}
