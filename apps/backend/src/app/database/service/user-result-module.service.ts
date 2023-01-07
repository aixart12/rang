import { Injectable } from '@nestjs/common';
import { UserResult } from '@rang/shared/common-models';
import { Repository, Sequelize } from 'sequelize-typescript';

import { UserResultSchema, UserSchema } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class UserResultModelService extends BaseService<
  UserResultSchema,
  UserResult
> {
  repository: Repository<UserResultSchema>;

  constructor(public readonly sequelize: Sequelize) {
    super();
    this.repository = sequelize.getRepository(UserResultSchema);
  }
}
