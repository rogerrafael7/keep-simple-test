import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Scope } from '@nestjs/common';
import { GetUserLogsUseCase } from '@/application/usecase/user/get-user-logs.usecase';

export const GetUserLogsUseCaseName = 'GetUserLogsUseCase';

export const getUserLogsFactory: Provider = {
  scope: Scope.REQUEST,
  provide: GetUserLogsUseCaseName,
  inject: [UserRepo.name],
  useFactory: (userRepository: UserRepositoryDomain) => {
    return new GetUserLogsUseCase(userRepository);
  },
};
