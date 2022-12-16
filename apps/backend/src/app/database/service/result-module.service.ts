import { Injectable } from '@nestjs/common';
import { Result } from '@rang/shared/common-models';
import { Repository, Sequelize } from 'sequelize-typescript';
import { ResultSchema } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class ResultModelService extends BaseService<ResultSchema, Result> {
  repository: Repository<ResultSchema>;

  constructor(public readonly sequelize: Sequelize) {
    super();
    this.repository = sequelize.getRepository(ResultSchema);
  }
}
