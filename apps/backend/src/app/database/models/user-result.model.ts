import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import {
  DATABASE_TABLES,
  DATABASE_TABLES_UNIQUE,
} from '../constants/database-constraints.constants';

import { UserResult } from '@rang/shared/common-models';
import { POSTGRES_CURRENT_TIMESTAMP } from '../constants/database-time.constants';
import { ResultSchema } from './results.model';
import { UserSchema } from './users.model';

@Table({
  tableName: DATABASE_TABLES.USERS_RESULTS,
  modelName: DATABASE_TABLES.USERS_RESULTS,
})
export class UserResultSchema extends Model<UserResult> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => UserSchema)
  @PrimaryKey
  @Column({
    unique: DATABASE_TABLES_UNIQUE.USER_AND_RESULT_CONSTANTS,
  })
  UserId: string;

  @ForeignKey(() => ResultSchema)
  @PrimaryKey
  @Column({
    unique: DATABASE_TABLES_UNIQUE.USER_AND_RESULT_CONSTANTS,
  })
  ResultId: number;

  @Column
  userInput: string;

  @Column
  userInputValue: string;

  @Column
  outCome: boolean;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  createdAt: string;
}
