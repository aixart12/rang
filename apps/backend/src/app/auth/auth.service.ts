import { JwtService } from '@nestjs/jwt';
import { User } from '@rang/shared/common-models';
import * as bcrypt from 'bcrypt';

import { UserModelService } from '../database/service/user-module.service';
import { UserService } from '../modules/users/user.service';
import { JwtDecodeType } from './dto/jwt-decod-type';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDto } from '../modules/users/dto/user.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userModelService: UserModelService,
    private readonly jwtService: JwtService
  ) {}

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return this.userModelService.sequelize.transaction(async (transaction) => {
      const user = await this.userModelService.getOneWhere(
        { phoneNumber: updatePasswordDto.phoneNumber },
        transaction
      );
      if (
        !(await this.comparePassword(
          updatePasswordDto.token,
          user.refreshToken
        ))
      ) {
        throw new UnauthorizedException('Invalid token');
      }
      const password = await this.hashPassword(updatePasswordDto.password);
      return this.userService.updatePassword(
        updatePasswordDto.phoneNumber,
        password,
        transaction
      );
    });
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

  verifyResetToken(resetToken: string, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        try {
          const payload = this.jwtService.decode(resetToken) as JwtDecodeType;
          if (!payload) {
            throw new UnauthorizedException('Invalid reset Token');
          }
          const user = await this.userService.findOneByPhone(
            payload.phoneNumber,
            transaction
          );
          if (!user) {
            throw new UnauthorizedException('User not Found');
          }
          if (!(await this.comparePassword(resetToken, user.resetToken))) {
            throw new UnauthorizedException('Invalid reset token');
          }
          const newResetToken = await this.jwtService.signAsync(
            { phoneNumber: payload.phoneNumber },
            { expiresIn: process.env.RESET_TOKEN_EXPIRATION }
          );
          await this.setResetToken(
            newResetToken,
            payload.phoneNumber,
            transaction
          );
          return newResetToken;
        } catch (e) {
          throw new UnauthorizedException('Token is not valid');
        }
      }
    );
  }

  validateUser(phoneNumber: string, password: string) {
    return this.userModelService.sequelize.transaction(async (transaction) => {
      const user = await this.userService.findOneByPhone(
        phoneNumber,
        transaction
      );
      if (!user) {
        return null;
      }
      const match = await this.comparePassword(password, user.password);
      if (!match) {
        return null;
      }
      return user;
    });
  }

  async login(user: UsersDto) {
    const getUser = await this.userService.findOneByPhone(user.phoneNumber);

    const token = await this.generateToken(getUser);

    const refreshToken = await this.generateRefreshToken(getUser?.phoneNumber);

    await this.updateRefreshToken(getUser.id, refreshToken);
    return { user, token, refreshToken };
  }

  register(user: UsersDto) {
    return this.userModelService.sequelize.transaction(async (transaction) => {
      const password = user?.password;

      const pass = await this.hashPassword(password);
      const refreshToken = await this.generateRefreshToken(user.phoneNumber);
      const hashedRefreshedToken = await this.hashPassword(refreshToken);
      const resetToken = await this.jwtService.signAsync(
        { phoneNumber: user.phoneNumber },
        { expiresIn: process.env.RESET_TOKEN_EXPIRATION }
      );
      const hashedResetToken = await this.hashPassword(resetToken);
      const newUser = await this.userModelService.add({
        ...user,
        password: pass,
        resetToken: hashedResetToken,
        refreshToken: hashedRefreshedToken,
      });
      return { user: newUser, refreshToken };
    });
  }

  setResetToken(
    resetToken: string,
    phoneNumber: string,
    transaction?: Transaction
  ) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const hashedReResetToken = await this.hashPassword(resetToken);
        return this.userService.updateResetToken(
          phoneNumber,
          hashedReResetToken,
          transaction
        );
      }
    );
  }

  getNewAccessToken(refreshToken: string, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const isRefreshTokenValid = this.isRefreshTokenValid(refreshToken);
        if (!isRefreshTokenValid) {
          throw new UnauthorizedException('Refresh token is not valid');
        }
        const payload = this.jwtService.decode(refreshToken) as JwtDecodeType;
        if (!payload) {
          throw new UnauthorizedException('Refresh token is not valid');
        }
        const user = await this.userService.findOneByPhone(
          payload.phoneNumber,
          transaction
        );
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        const token = await this.generateToken(user);
        const refreshTokenNew = await this.generateRefreshToken(
          user.phoneNumber
        );
      }
    );
  }

  updateRefreshToken(
    userId: number,
    refreshToken: string,
    transaction?: Transaction
  ) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const hashedRefreshedToken = await this.hashPassword(refreshToken);
        console.log(
          '🚀 ~ file: auth.service.ts:211 ~ AuthService ~ hashedRefreshedToken',
          hashedRefreshedToken
        );
        const updatedUser = await this.userService.updateRefreshToken(
          userId,
          hashedRefreshedToken,
          transaction
        );
        return updatedUser;
      }
    );
  }

  forgotPassword(phoneNumber: string, transaction?: Transaction) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const user = await this.userService.findOneByPhone(
          phoneNumber,
          transaction
        );
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        const resetToken = await this.jwtService.signAsync(
          { phoneNumber: user.phoneNumber },
          { expiresIn: process.env.RESET_TOKEN_EXPIRATION }
        );
      }
    );
  }

  changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
    transaction?: Transaction
  ) {
    return this.userModelService.sequelize.transaction(
      { transaction },
      async (transaction) => {
        const userData = await this.userModelService.getOneWhere(
          { id: userId },
          transaction
        );
        if (userData) {
          const match = await this.comparePassword(
            currentPassword,
            userData.password
          );
          if (match) {
            const newPasswordHash = await this.hashPassword(newPassword);
            return this.userModelService.updateWhere(
              { password: newPasswordHash },
              { id: userId },
              transaction
            );
          }
        }
        return false;
      }
    );
  }

  async logout(userId: number) {
    return this.userService.updateRefreshToken(userId, null);
  }

  private async generateToken(user: User) {
    const token = await this.jwtService.signAsync(user, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    return token;
  }

  async generateRefreshToken(phoneNumber: string) {
    const refreshToken = await this.jwtService.signAsync(
      { phoneNumber },
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }
    );
    return refreshToken;
  }
  async isRefreshTokenValid(refreshToken: string) {
    try {
      const payload = this.jwtService.decode(refreshToken) as JwtDecodeType;
      // INFO : This is to check if the token is expired or not
      if (payload.exp < Date.now() / 1000) {
        // Divide by 1000 to get timestamp in seconds
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  async comparePassword(enterPassword: string, dbPassword: string) {
    return bcrypt.compare(enterPassword, dbPassword);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
