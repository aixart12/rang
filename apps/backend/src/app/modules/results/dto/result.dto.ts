import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ResultsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly resultColor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly resultNumber: number;
}
