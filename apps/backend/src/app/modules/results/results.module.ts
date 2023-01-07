import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ResultModelService } from '../../database/service/result-module.service';
import { ResultsController } from './results.controller';
import { ResultService } from './results.service';

@Module({
  imports: [DatabaseModule.forFeature([ResultModelService])],
  controllers: [ResultsController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}
