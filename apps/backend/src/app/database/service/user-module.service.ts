import { Injectable } from '@nestjs/common';
import { User } from '@rang/shared/common-models';
import { Repository, Sequelize } from 'sequelize-typescript';

import { UserSchema } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class UserModelService extends BaseService<UserSchema, User> {
  repository: Repository<UserSchema>;

  constructor(public readonly sequelize: Sequelize) {
    super();
    this.repository = sequelize.getRepository(UserSchema);
  }
}
