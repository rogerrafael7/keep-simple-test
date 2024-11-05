import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Scope } from '@nestjs/common';
import { RemoveUserUseCase } from '@/application/usecase/user/remove-user.usecase';

export const RemoveUserUseCaseName = 'RemoveUserUseCase';

export const removeUserFactory: Provider = {
  scope: Scope.REQUEST,
  provide: RemoveUserUseCaseName,
  inject: [UserRepo.name],
  useFactory: (userRepository: UserRepositoryDomain) => {
    return new RemoveUserUseCase(userRepository);
  },
};
