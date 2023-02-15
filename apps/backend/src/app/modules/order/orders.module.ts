import { Module } from '@nestjs/common';
import { ResultModule } from '../results/results.module';
import { ResultService } from '../results/results.service';
import { UserResultModule } from '../users-results/user-result.module';
import { OrderController } from './orders.controllers';
import { TimerGateway } from './orders.gateway';
import { OrderService } from './orders.service';

@Module({
  imports: [ResultModule, UserResultModule],
  controllers: [OrderController],
  providers: [OrderService, TimerGateway],
  exports: [],
})
export class OrderModule {}
