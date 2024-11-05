import {
  GetUsersInputDto,
  GetUsersResponseDto,
} from '@/domain/usecase/user/dto/get-users.dto';

export interface GetUsersUseCaseDomain {
  execute(payload: GetUsersInputDto): Promise<GetUsersResponseDto>;
}
