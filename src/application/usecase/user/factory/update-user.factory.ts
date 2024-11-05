import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Scope } from '@nestjs/common';
import { UpdateUserUseCase } from '@/application/usecase/user/update-user.usecase';

export const UpdateUserUseCaseName = 'UpdateUserUseCase';

export const updateUserFactory: Provider = {
  scope: Scope.REQUEST,
  provide: UpdateUserUseCaseName,
  inject: [UserRepo.name],
  useFactory: (userRepository: UserRepositoryDomain) => {
    return new UpdateUserUseCase(userRepository);
  },
};
