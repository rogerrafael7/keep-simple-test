import { CreateUserUseCaseDomain } from '@/domain/usecase/user/create-user.usercase';
import { UserModel } from '@/domain/model/user.model';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import { SecurityUtil } from '@/infra/shared/utils/security.util';
import {
  CreateUserInputDto,
  CreateUserResponseDto,
} from '@/domain/usecase/user/dto/create-user.dto';

export class CreateUserUseCase implements CreateUserUseCaseDomain {
  constructor(private readonly userRepository: UserRepositoryDomain) {}
  async execute(
    data: CreateUserInputDto,
    createdBy: number,
  ): Promise<CreateUserResponseDto> {
    const password = await SecurityUtil.hashPassword(data.password);
    const payload: UserModel = {
      ...data,
      password,
    };
    const userCreated = await this.userRepository.createUser(
      payload,
      createdBy,
    );
    return {
      id: userCreated.id,
    };
  }
}
