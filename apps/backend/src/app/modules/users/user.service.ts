import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { number } from 'yup';
import { UserModelService } from '../../database/service/user-module.service';
import { UsersDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userModelService: UserModelService) {}

  getAllUsers(transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userModelService.getAll(transaction);
      }
    );
  }

  getUserById(id: number, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userModelService.getOneWhere({ id }, transaction);
      }
    );
  }

  updatePassword(
    phoneNumber: string,
    password: string,
    transaction?: Transaction
  ) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        // INFO : Update is reset token to false and update password where phoneNumber
        const user = await this.findOneByPhone(phoneNumber);
        if (!user) {
          throw new BadRequestException('User Not found');
        }
        return this.userModelService.updateWhere(
          { ...user, password: password, resetToken: null },
          { id: user.id },
          transaction
        );
      }
    );
  }

  deleteUserById(id: number, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const isUserDeleted = await this.userModelService.removeWhere(
          { id },
          transaction
        );
        return isUserDeleted;
      }
    );
  }
  create(user: UsersDto, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const newUser = await this.userModelService.add(user, transaction);
        return newUser;
      }
    );
  }

  /**
   * @description - It checks if the user is available in the database.
   * @param mobile
   * @returns boolean
   */
  findOneByPhone(phoneNumber: string, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) =>
        this.userModelService.getOneWhere({ phoneNumber }, transaction, {
          paranoid: false,
        })
    );
  }

  updateRefreshToken(
    id: number,
    refreshToken: string,
    transaction?: Transaction
  ) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const res = await this.userModelService.updateWhere(
          { refreshToken },
          { id },
          transaction
        );
        console.log('🚀 ~ file: user.service.ts:96 ~ UserService ~ res', res);
        return res;
      }
    );
  }

  updateResetToken(
    phoneNumber: string,
    resetToken: string,
    transaction?: Transaction
  ) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        return this.userModelService.updateWhere(
          { resetToken: resetToken },
          { phoneNumber },
          transaction
        );
      }
    );
  }
}
