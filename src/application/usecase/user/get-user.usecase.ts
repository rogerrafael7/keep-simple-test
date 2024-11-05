import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { GetUserUseCaseDomain } from '@/domain/usecase/user/get-user.usercase';
import { GetUserResponseDto } from '@/domain/usecase/user/dto/get-user.dto';
import { UserModelMapper } from '@/domain/mapper/user-model.mapper';

export class GetUserUseCase implements GetUserUseCaseDomain {
  constructor(private readonly userRepository: UserRepositoryDomain) {}
  async execute(id: number): Promise<GetUserResponseDto> {
    const user = await this.userRepository.findById(id);
    return UserModelMapper.toDomainGetUser(user);
  }
}
