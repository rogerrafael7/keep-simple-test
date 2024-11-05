import { GetUserUseCaseDomain } from '@/domain/usecase/user/get-user.usercase';

export const getUserUseCaseDomainStub = {
  execute: jest.fn(),
} as unknown as GetUserUseCaseDomain;
