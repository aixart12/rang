import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@rang/shared/common-models';
import { RefreshTokenDto, UsersDto } from '../modules/users/dto/user.dto';
import { AuthUser } from '../utils/decorators/user.decorator';
import { AuthService } from './auth.service';

@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@AuthUser() userJwt: UsersDto) {
    return this.authService.login(userJwt);
  }

  @Post('signup')
  async signup(@Body() user: UsersDto) {
    return this.authService.register(user);
  }
  @Get('verify-token')
  async verifyToken(@AuthUser() userJwt: User) {
    return userJwt;
  }

  @Get('update-access-token')
  async updateAccessToken(@Body() { refreshToken }: RefreshTokenDto) {
    console.log(
      '🚀 ~ file: auth.controller.ts:34 ~ AuthController ~ updateAccessToken ~ getNewAccessToken',
      refreshToken
    );
    return this.authService.getNewAccessToken(refreshToken);
  }

  @Put('logout')
  async logout(@AuthUser() userFromJwt: User) {
    this.authService.logout(userFromJwt.id);
  }
}
