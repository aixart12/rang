import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ResultService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultService: ResultService) {}

  @Get('/')
  getAllResult() {
    return this.resultService.getAllResults();
  }

  @Get(':id')
  getResultWithId(@Param('id', ParseIntPipe) id: number) {
    return this.resultService.getResultById(id);
  }

  // @Get('/last-result')
  // getLastResult(){

  // }
}
