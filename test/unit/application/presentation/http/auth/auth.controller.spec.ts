import {
  DoLoginInputDto,
  DoLoginResponseDto,
} from '@/domain/usecase/auth/dto/do-login.dto';
import { AuthController } from '@/application/presentation/http/auth/auth.controller';
import { doLoginUseCaseDomainStub } from '../../../../__stubs__/doLoginUseCaseDomain.stub';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    authController = new AuthController(doLoginUseCaseDomainStub);
  });

  describe('login', () => {
    it('should return auth data', async () => {
      const input: DoLoginInputDto = {
        taxId: '61033267023',
        password: '61033267023',
      };
      const output: DoLoginResponseDto = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzMwNzc4NzMzLCJleHAiOjE3MzA4NjUxMzN9.gYgz2q6OtugEuNPW_qOlUdsFrtkSjtqPUllLlnD63HU',
        expiresIn: '1d',
      };

      jest.spyOn(doLoginUseCaseDomainStub, 'execute').mockResolvedValue(output);
      expect(await authController.login(input)).toBe(output);
    });

    it('should throw error if payload is invalid', async () => {
      const input: DoLoginInputDto = {
        taxId: 'errado',
        password: '123456',
      };
      const dto = plainToInstance(DoLoginInputDto, input);
      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
    });
  });
});
