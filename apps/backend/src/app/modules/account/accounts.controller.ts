import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './accounts.service';

@ApiTags('Accounts')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/')
  getCurrentAmount(userId: number) {
    return 'Hello';
  }
}
