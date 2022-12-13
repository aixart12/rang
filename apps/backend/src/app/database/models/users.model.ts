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
import { User } from '@rang/shared/common-models';
import { TextLengthColumn } from '../decorators/textLengthColumn';
import {
  LENGTH_255,
  POSTGRES_CURRENT_TIMESTAMP,
} from '../constants/database-time.constants';

@Table({
  tableName: DATABASE_TABLES.USERS,
  modelName: DATABASE_TABLES.USERS,
  paranoid: true,
})
export class UserSchema extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @TextLengthColumn()
  firstName: string;

  @TextLengthColumn()
  middleName: string;

  @TextLengthColumn()
  lastName: string;

  @Column({
    type: DataType.VIRTUAL,
    get(this) {
      const middleName = this.getDataValue('middleName')
        ? `${this.getDataValue('middleName')} `
        : '';

      return `${this.getDataValue(
        'firstName'
      )} ${middleName}${this.getDataValue('lastName')}`;
    },
  })
  fullName: string;

  @TextLengthColumn()
  email: string;

  @Column({
    type: DataType.STRING(LENGTH_255),
  })
  resetToken: string;

  @Column
  phoneNumber: string;

  @Column
  password: string;

  @Column
  isSuperAdmin: boolean;

  @Column({
    type: DataType.STRING(LENGTH_255),
  })
  refreshToken: string;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  createdAt: string;

  @Default(Sequelize.literal(POSTGRES_CURRENT_TIMESTAMP))
  @Column({ type: DataType.DATE })
  updatedAt: string;

  @Column({ type: DataType.DATE })
  deletedAt: string;
}
