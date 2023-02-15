import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AccountModelService } from '../../database/service/account-module.service';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';

@Module({
  imports: [DatabaseModule.forFeature([AccountModelService])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [],
})
export class AccountModule {}
