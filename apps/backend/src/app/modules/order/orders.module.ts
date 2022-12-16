import { Module } from '@nestjs/common';
import { OrderController } from './orders.controllers';
import { TimerGateway } from './orders.gateway';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [TimerGateway],
  exports: [],
})
export class OrderModule {}
