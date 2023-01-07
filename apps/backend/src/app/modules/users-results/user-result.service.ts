import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { UserResultModelService } from '../../database/service/user-result-module.service';
import { UserResultDto } from './dto/user-result.dto';

@Injectable()
export class UserResultService {
  constructor(
    private readonly userResultModuleService: UserResultModelService
  ) {}

  getAllUsersResults(transaction?: Transaction) {
    return this.userResultModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userResultModuleService.getAll(transaction);
      }
    );
  }

  create(userResult: UserResultDto, transaction?: Transaction) {
    return this.userResultModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userResultModuleService.add(userResult, transaction);
      }
    );
  }

  getAllByUserIdAndResultId(
    userId: number,
    resultId: number,
    transaction?: Transaction
  ) {
    return this.userResultModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userResultModuleService.getAllWhere(
          {
            UserId: userId,
            ResultId: resultId,
          },
          transaction
        );
      }
    );
  }

  getAllByUSerId(userId: number, transaction?: Transaction) {
    return this.userResultModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userResultModuleService.getAllWhere(
          {
            UserId: userId,
          },
          transaction
        );
      }
    );
  }

  getAllByResultId(resultId: number, transaction?: Transaction) {
    return this.userResultModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userResultModuleService.getAllWhere(
          {
            ResultId: resultId,
          },
          transaction
        );
      }
    );
  }
}
