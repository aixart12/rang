import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UsersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly middleName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isSuperAdmin: boolean;

  @ApiProperty()
  @IsOptional()
  readonly password: string;
}

export class RefreshTokenDto {
  @IsString()
  @ApiProperty()
  readonly refreshToken: string;
}
