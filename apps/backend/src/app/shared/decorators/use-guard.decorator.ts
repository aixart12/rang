import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../utils/guards/jwtAuthGuard';

export const JWTAuthGuard = () => UseGuards(JwtAuthGuard);
