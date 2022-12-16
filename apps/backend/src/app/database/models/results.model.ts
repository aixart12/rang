import { Result } from '@rang/shared/common-models';
import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { DATABASE_TABLES } from '../constants/database-constraints.constants';
import { POSTGRES_CURRENT_TIMESTAMP } from '../constants/database-time.constants';

@Table({
  tableName: DATABASE_TABLES.RESULTS,
  modelName: DATABASE_TABLES.RESULTS,
})
export class ResultSchema extends Model<Result> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  type: string;

  @Column
  resultColor: string;

  @Column
  resultNumber: number;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  createdAt: string;
}
