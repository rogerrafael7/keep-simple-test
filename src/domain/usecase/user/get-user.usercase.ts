import { GetUserResponseDto } from '@/domain/usecase/user/dto/get-user.dto';

export interface GetUserUseCaseDomain {
  execute(id: number): Promise<GetUserResponseDto>;
}
