import { ApiProperty } from '@nestjs/swagger';

export class GetUserLogsResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  createdBy?: number;
  @ApiProperty()
  updatedBy?: number;
  @ApiProperty()
  removedAt?: Date | null;
  @ApiProperty()
  removedBy?: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
