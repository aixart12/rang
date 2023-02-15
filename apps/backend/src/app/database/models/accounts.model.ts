import { Account } from '@rang/shared/common-models';
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
import { POSTGRES_CURRENT_TIMESTAMP } from '../constants/database-time.constants';
import { UserSchema } from './users.model';

@Table({
  tableName: DATABASE_TABLES.ACCOUNTS,
  modelName: DATABASE_TABLES.ACCOUNTS,
})
export class AccountSchema extends Model<Account> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => UserSchema)
  @PrimaryKey
  @Column({
    unique: DATABASE_TABLES_UNIQUE.ACCOUNT_AND_USER_CONSTANTS,
  })
  UserId: string;

  @Column
  currentValue: number;

  @Column
  lastActionValue: number;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  createdAt: string;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  updatedAt: string;
}
