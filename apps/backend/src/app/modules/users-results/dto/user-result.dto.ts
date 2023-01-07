import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Default } from 'sequelize-typescript';

export class UserResultDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly UserId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly ResultId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly userInput: string;

  @ApiProperty()
  @IsBoolean()
  readonly outcome: boolean;
}
