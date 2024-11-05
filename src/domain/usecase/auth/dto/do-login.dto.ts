import { IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DoLoginInputDto {
  @IsNumberString()
  taxId: string;

  @IsString()
  password: string;
}

export class DoLoginResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresIn: string;
}
