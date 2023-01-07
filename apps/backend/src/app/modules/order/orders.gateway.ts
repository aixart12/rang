import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as moment from 'moment';
import { Server } from 'socket.io';
import * as _ from 'lodash';

import { ResultService } from '../results/results.service';
import {
  OrderSelectColor,
  OrderTypeConstants,
} from '@rang/shared/common-react-models';

@WebSocketGateway({ cors: true })
export class TimerGateway {
  constructor(private readonly resultService: ResultService) {}

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
    setInterval(async () => {
      fixTime = fixTime - interval;
      let duration = moment.duration(fixTime, 'milliseconds');
      if (fixTime == 0) {
        fixTime = 120000;
      }
      let randomProperty = (obj: any) => {
        var keys = _.keys(obj);
        return obj[keys[(keys.length * Math.random()) << 0]];
      };
      if (duration.seconds() == 30) {
        const result = await this.resultService.create({
          type: OrderTypeConstants.TYPE_1,
          resultColor: randomProperty(OrderSelectColor),
          resultNumber: _.random(10),
        });
        this.server.sockets.emit('latest-result', result);
      }
      return this.server.sockets.emit('timer', {
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }, interval);
  }
}
