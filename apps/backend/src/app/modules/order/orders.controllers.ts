import { Controller, Get } from '@nestjs/common';
import { TimerGateway } from './orders.gateway';

@Controller('orders')
export class OrderController {
  constructor(private readonly timerGateway: TimerGateway) {}

  @Get('/timer')
  getTimer() {
    return this.timerGateway.countTime();
  }
}
