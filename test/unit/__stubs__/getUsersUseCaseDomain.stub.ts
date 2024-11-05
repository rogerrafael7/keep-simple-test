import { GetUsersUseCaseDomain } from '@/domain/usecase/user/get-users.usercase';

export const getUsersUseCaseDomainStub = {
  execute: jest.fn(),
} as unknown as GetUsersUseCaseDomain;
