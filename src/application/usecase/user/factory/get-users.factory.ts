import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Scope } from '@nestjs/common';
import { GetUsersUseCase } from '@/application/usecase/user/get-users.usecase';

export const GetUsersUseCaseName = 'GetUsersUseCase';

export const getUsersFactory: Provider = {
  scope: Scope.REQUEST,
  provide: GetUsersUseCaseName,
  inject: [UserRepo.name],
  useFactory: (userRepository: UserRepositoryDomain) => {
    return new GetUsersUseCase(userRepository);
  },
};
