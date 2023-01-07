import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { ResultModelService } from '../../database/service/result-module.service';
import { TimerGateway } from '../order/orders.gateway';
import { ResultsDto } from './dto/result.dto';

@Injectable()
export class ResultService {
  constructor(private readonly resultsModuleService: ResultModelService) {}

  create(result: ResultsDto, transaction?: Transaction) {
    return this.resultsModuleService.add(result, transaction);
  }

  getAllResults(transaction?: Transaction) {
    return this.resultsModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.resultsModuleService.getAll(transaction);
      }
    );
  }

  /**
   * @description - It checks if the user is available in the database.
   * @param id
   * @returns boolean
   */
  getResultById(id: number, transaction?: Transaction) {
    return this.resultsModuleService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.resultsModuleService.getOneWhere({ id }, transaction);
      }
    );
  }
}
