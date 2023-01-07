import { Module } from '@nestjs/common';
import { ResultModule } from '../results/results.module';
import { ResultService } from '../results/results.service';
import { OrderController } from './orders.controllers';
import { TimerGateway } from './orders.gateway';

@Module({
  imports: [ResultModule],
  controllers: [OrderController],
  providers: [TimerGateway],
  exports: [],
})
export class OrderModule {}
