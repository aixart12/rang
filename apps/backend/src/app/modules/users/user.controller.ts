import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
}
