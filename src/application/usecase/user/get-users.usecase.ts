import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { GetUsersUseCaseDomain } from '@/domain/usecase/user/get-users.usercase';
import {
  GetUsersInputDto,
  GetUsersResponseDto,
} from '@/domain/usecase/user/dto/get-users.dto';
import { UserModelMapper } from '@/domain/mapper/user-model.mapper';

export class GetUsersUseCase implements GetUsersUseCaseDomain {
  constructor(private readonly userRepository: UserRepositoryDomain) {}

  async execute(payload: GetUsersInputDto): Promise<GetUsersResponseDto> {
    const result = await this.userRepository.findManyPaginated(payload);
    return UserModelMapper.toDomainGetUsers(result);
  }
}
