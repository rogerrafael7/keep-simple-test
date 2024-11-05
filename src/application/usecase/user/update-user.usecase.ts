import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UpdateUserUseCaseDomain } from '@/domain/usecase/user/update-user.usercase';
import { UserModel } from '@/domain/model/user.model';
import { SecurityUtil } from '@/infra/shared/utils/security.util';

export class UpdateUserUseCase implements UpdateUserUseCaseDomain {
  constructor(private readonly userRepository: UserRepositoryDomain) {}

  async execute(
    id: number,
    input: Partial<UserModel>,
    updatedBy: number,
  ): Promise<void> {
    const payload = {
      ...input,
    };
    if (input.password) {
      payload.password = await SecurityUtil.hashPassword(payload.password);
    }
    return this.userRepository.updateOneById(id, payload, updatedBy);
  }
}
