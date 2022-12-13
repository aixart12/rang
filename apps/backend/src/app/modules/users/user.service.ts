import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
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
}
