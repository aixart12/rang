import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserModelService } from '../../database/service/user-module.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule.forFeature([UserModelService])],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
