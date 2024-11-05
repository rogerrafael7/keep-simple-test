import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { RemoveUserUseCaseDomain } from '@/domain/usecase/user/remove-user.usercase';

export class RemoveUserUseCase implements RemoveUserUseCaseDomain {
  constructor(private readonly userRepository: UserRepositoryDomain) {}

  execute(id: number, removedBy: number): Promise<void> {
    return this.userRepository.removeOneById(id, removedBy);
  }
}
