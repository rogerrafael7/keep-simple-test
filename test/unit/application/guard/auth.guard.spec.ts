import { AuthGuard } from '@/application/guard/auth.guard';
import { reflectorStub } from '../../__stubs__/reflector.stub';
import { executionContextStub } from '../../__stubs__/express.stub';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    authGuard = new AuthGuard(reflectorStub);
  });

  it('should return true if isPublic is true', () => {
    jest.spyOn(reflectorStub, 'getAllAndOverride').mockReturnValue(true);
    const result = authGuard.canActivate(executionContextStub);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if token not found', () => {
    const req = executionContextStub.switchToHttp().getRequest();
    jest.spyOn(reflectorStub, 'getAllAndOverride').mockReturnValue(false);
    req.headers.authorization = undefined;
    expect(() => authGuard.canActivate(executionContextStub)).toThrow(
      'Token not found',
    );
  });

  it('should return true if token is valid', () => {
    const req = executionContextStub.switchToHttp().getRequest();
    jest.spyOn(reflectorStub, 'getAllAndOverride').mockReturnValue(false);
    req.headers.authorization = 'Bearer token';
    jest.spyOn(authGuard, 'verify').mockReturnValue({ id: 1 });
    const result = authGuard.canActivate(executionContextStub);
    expect(result).toBe(true);
    expect(req.user).toEqual({ id: 1 });
  });
});
