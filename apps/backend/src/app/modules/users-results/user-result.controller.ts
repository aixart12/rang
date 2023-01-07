import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserResultDto } from './dto/user-result.dto';
import { UserResultService } from './user-result.service';

@Controller('user-result')
export class UserResultController {
  constructor(private readonly userResultService: UserResultService) {}

  @Get('/')
  getAllUsersResults() {
    return this.userResultService.getAllUsersResults();
  }

  @Post('/')
  create(@Body() userResult: UserResultDto) {
    console.log(
      '🚀 ~ file: user-result.controller.ts:23 ~ UserResultController ~ create ~ userResult',
      userResult
    );
    return this.userResultService.create(userResult);
  }

  @Get('/user/:userId/result/:resultId')
  getAllByUserIdAndResultId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('resultId', ParseIntPipe) resultId: number
  ) {
    return this.userResultService.getAllByUserIdAndResultId(userId, resultId);
  }
}
