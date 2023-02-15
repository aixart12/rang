import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { UserResultService } from '../users-results/user-result.service';

@Injectable()
export class OrderService {
  constructor(private readonly userResultService: UserResultService) {}

  async checkUerInput(
    resultId: number,
    resultColor: string,
    resultNumber: string
  ) {
    const userResult = await this.userResultService.getAllByResultId(resultId);
    if (!userResult) {
      throw new BadRequestException("Play Id doesn't exits");
    }
    _.map(userResult, (data) => {
      if (data.userInput == resultColor || resultNumber) {
        return this.userResultService.updateOutCome(data.id, true);
      } else {
        return this.userResultService.updateOutCome(data.id, false);
      }
    });
  }
}
