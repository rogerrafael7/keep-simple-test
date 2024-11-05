import { UpdateUserUseCaseDomain } from '@/domain/usecase/user/update-user.usercase';

export const updateUserUseCaseDomainStub = {
  execute: jest.fn(),
} as unknown as UpdateUserUseCaseDomain;
