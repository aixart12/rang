import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@rang/shared/common-models';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../modules/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }
  async validate(payload: User) {
    const user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException(' You are nto authorized User');
    }
    return user;
  }
}
