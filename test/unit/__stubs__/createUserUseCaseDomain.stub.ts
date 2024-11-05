import { CreateUserUseCaseDomain } from '@/domain/usecase/user/create-user.usercase';

export const createUserUseCaseDomainStub = {
  execute: jest.fn(),
} as unknown as CreateUserUseCaseDomain;
