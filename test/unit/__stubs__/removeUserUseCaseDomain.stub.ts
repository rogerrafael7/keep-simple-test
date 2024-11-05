import { RemoveUserUseCaseDomain } from '@/domain/usecase/user/remove-user.usercase';

export const removeUserUseCaseDomainStub = {
  execute: jest.fn(),
} as unknown as RemoveUserUseCaseDomain;
