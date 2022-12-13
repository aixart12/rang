import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
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
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly isSuperAdmin: boolean;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly employeeCode: number;

  @ApiProperty()
  @IsOptional()
  readonly password: string;
}

export class RefreshTokenDto {
  @IsString()
  @ApiProperty()
  readonly refreshToken: string;
}
