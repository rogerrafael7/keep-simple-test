import { DoLoginUseCaseDomain } from '@/domain/usecase/auth/do-login.usecase';
import {
  DoLoginInputDto,
  DoLoginResponseDto,
} from '@/domain/usecase/auth/dto/do-login.dto';
import { UserRepositoryDomain } from '@/domain/repo/user-repository.domain';
import {
  SERVER_EXCEPTION_CODE,
  ServerException,
} from '@/infra/shared/exceptions/server.exception';
import { SecurityUtil } from '@/infra/shared/utils/security.util';

export class DoLoginUseCase implements DoLoginUseCaseDomain {
  constructor(private readonly userRepo: UserRepositoryDomain) {}
  async execute(payload: DoLoginInputDto): Promise<DoLoginResponseDto> {
    const user = await this.userRepo.findUserByTaxId(payload.taxId);
    if (!user) {
      throw new ServerException(
        'Invalid credentials',
        SERVER_EXCEPTION_CODE.NOT_FOUND,
      );
    }

    const isValidPassword = await SecurityUtil.comparePassword(
      payload.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new ServerException(
        'Invalid credentials',
        SERVER_EXCEPTION_CODE.UNAUTHORIZED,
      );
    }

    const expiresIn = '1d';

    const token = SecurityUtil.generateJwtToken(
      {
        id: user.id,
        name: user.name,
      },
      expiresIn,
    );

    return {
      token,
      expiresIn,
    };
  }
}
