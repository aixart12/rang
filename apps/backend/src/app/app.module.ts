import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './modules/order/orders.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [DatabaseModule.forRoot(), UserModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
