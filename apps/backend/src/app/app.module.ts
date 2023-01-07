import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './modules/order/orders.module';
import { ResultModule } from './modules/results/results.module';
import { UserResultModule } from './modules/users-results/user-result.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    UserModule,
    OrderModule,
    ResultModule,
    AuthModule,
    UserResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
