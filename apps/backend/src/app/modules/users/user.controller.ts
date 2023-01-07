import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@rang/shared/common-models';
import { JWTAuthGuard } from '../../shared/decorators/use-guard.decorator';
import { AuthUser } from '../../utils/decorators/user.decorator';
import { UsersDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('/')
  createUser(@Body() user: UsersDto) {
    return this.userService.create(user);
  }

  @JWTAuthGuard()
  @Get('/loggedIn-user')
  getById(@AuthUser() userFromJwt: User) {
    console.log(
      '🚀 ~ file: user.controller.ts:26 ~ UserController ~ getById ~ userFromJwt',
      userFromJwt
    );
    return this.userService.getUserById(userFromJwt.id);
  }
}
