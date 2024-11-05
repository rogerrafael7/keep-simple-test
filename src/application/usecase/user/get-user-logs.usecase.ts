import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { GetUserLogsUseCaseDomain } from '@/domain/usecase/user/get-user-logs.usercase';
import { GetUserLogsResponseDto } from '@/domain/usecase/user/dto/get-user-logs.dto';

export class GetUserLogsUseCase implements GetUserLogsUseCaseDomain {
  constructor(private readonly userRepository: UserRepositoryDomain) {}

  execute(id: number): Promise<GetUserLogsResponseDto[]> {
    return this.userRepository.findLogsByUserId(id) as Promise<
      GetUserLogsResponseDto[]
    >;
  }
}
