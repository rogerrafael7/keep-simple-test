import { GetUserLogsResponseDto } from '@/domain/usecase/user/dto/get-user-logs.dto';

export interface GetUserLogsUseCaseDomain {
  execute(id: number): Promise<GetUserLogsResponseDto[]>;
}
