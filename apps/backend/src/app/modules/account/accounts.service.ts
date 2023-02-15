import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { AccountModelService } from '../../database/service/account-module.service';

@Injectable()
export class AccountService {
  constructor(private readonly accountModelService: AccountModelService) {}

  getAccountByUserId(userId: number, transaction?: Transaction) {
    return this.accountModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.accountModelService.getOneWhere(
          { userId: userId },
          transaction
        );
      }
    );
  }
  getAllAccount() {}
  getAccountByResultId() {}
  updateAmount(
    id: number,
    currentValue: number,
    lastActionValue: number,
    transaction?: Transaction
  ) {
    return this.accountModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.accountModelService.updateWhere(
          { id },
          { currentValue: currentValue, lastActionValue: lastActionValue },
          transaction
        );
      }
    );
  }
}
