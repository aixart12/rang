import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserResultModelService } from '../../database/service/user-result-module.service';
import { UserResultController } from './user-result.controller';
import { UserResultService } from './user-result.service';

@Module({
  imports: [DatabaseModule.forFeature([UserResultModelService])],
  controllers: [UserResultController],
  providers: [UserResultService],
  exports: [],
})
export class UserResultModule {}
