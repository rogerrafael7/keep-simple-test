import { ApiProperty } from '@nestjs/swagger';
import { DateString } from '@/infra/shared/types/common.type';

export class GetUserResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  taxId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  birthDate: DateString;
  @ApiProperty()
  street?: string;
  @ApiProperty()
  number?: string;
  @ApiProperty()
  complement?: string;
  @ApiProperty()
  neighborhood?: string;
  @ApiProperty()
  city?: string;
  @ApiProperty()
  state?: string;
  @ApiProperty()
  zipCode?: string;
  @ApiProperty()
  recordStatus?: string;
  @ApiProperty()
  removedAt?: Date;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
}
