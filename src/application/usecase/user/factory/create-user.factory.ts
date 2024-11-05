import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { CreateUserUseCase } from '@/application/usecase/user/create-user.usecase';
import { UserRepo } from '@/infra/data/repo/user.repo';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Scope } from '@nestjs/common';

export const CreateUserUseCaseName = 'CreateUserUseCase';

export const createUserFactory: Provider = {
  scope: Scope.REQUEST,
  provide: CreateUserUseCaseName,
  inject: [UserRepo.name],
  useFactory: (userRepository: UserRepositoryDomain) => {
    return new CreateUserUseCase(userRepository);
  },
};
