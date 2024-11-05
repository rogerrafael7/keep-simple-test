import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Scope } from '@nestjs/common';
import { GetUserUseCase } from '@/application/usecase/user/get-user.usecase';

export const GetUserUseCaseName = 'GetUserUseCase';

export const getUserFactory: Provider = {
  scope: Scope.REQUEST,
  provide: GetUserUseCaseName,
  inject: [UserRepo.name],
  useFactory: (userRepository: UserRepositoryDomain) => {
    return new GetUserUseCase(userRepository);
  },
};
