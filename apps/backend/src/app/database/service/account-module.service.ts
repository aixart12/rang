import { Injectable } from '@nestjs/common';
import { Account } from '@rang/shared/common-models';
import { Repository, Sequelize } from 'sequelize-typescript';

import { AccountSchema } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class AccountModelService extends BaseService<AccountSchema, Account> {
  repository: Repository<AccountSchema>;

  constructor(public readonly sequelize: Sequelize) {
    super();
    this.repository = sequelize.getRepository(AccountSchema);
  }
}
