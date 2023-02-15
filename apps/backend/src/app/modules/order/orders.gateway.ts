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
import { OrderService } from './orders.service';
import { BadGatewayException, BadRequestException } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class TimerGateway {
  constructor(
    private readonly resultService: ResultService,
    private readonly orderService: OrderService
  ) {}

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
        const resultNumber = _.random(10);
        const resultColor = randomProperty(OrderSelectColor);

        const result = await this.resultService.create({
          type: OrderTypeConstants.TYPE_1,
          resultColor: resultColor,
          resultNumber: resultNumber,
        });

        if (!result) {
          throw new BadRequestException('Result has no outCome');
        }

        await this.orderService.checkUerInput(
          result.id,
          resultColor,
          JSON.stringify(resultNumber)
        );

        this.server.sockets.emit('latest-result', result);
      }
      return this.server.sockets.emit('timer', {
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }, interval);
  }
}
