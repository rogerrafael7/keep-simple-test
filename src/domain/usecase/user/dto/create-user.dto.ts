import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DateString } from '@/infra/shared/types/common.type';

export class CreateUserInputDto {
  @ApiProperty({
    description: 'CPF',
  })
  @IsNumberString()
  @MinLength(2, { message: 'name must be at least 2 characters long' })
  @MaxLength(50, { message: 'name must be at most 50 characters long' })
  taxId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'birthDate must be in the format YYYY-MM-DD',
  })
  @IsString()
  birthDate: DateString;

  @ApiProperty()
  @IsOptional()
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password?: string;

  @ApiProperty()
  @IsOptional()
  street?: string;

  @ApiProperty()
  @IsOptional()
  number?: string;

  @ApiProperty()
  @IsOptional()
  complement?: string;

  @ApiProperty()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(2, { message: 'state must be at most 2 characters long' })
  state?: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'zipCode must be in the format xxxxx-xxx',
  })
  zipCode?: string;
}

export class CreateUserResponseDto {
  @ApiProperty()
  id: number;
}
