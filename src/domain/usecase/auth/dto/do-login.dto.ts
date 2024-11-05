import { IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DoLoginInputDto {
  @ApiProperty({ description: 'CPF' })
  @IsNumberString()
  taxId: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  password: string;
}

export class DoLoginResponseDto {
  @ApiProperty({
    description: 'JWT token',
  })
  token: string;

  @ApiProperty({
    example: '1d',
    description:
      'Defines the expiration time, a string format such as "1d" for one day, "1h" for one hour, etc.',
  })
  expiresIn: string;
}
