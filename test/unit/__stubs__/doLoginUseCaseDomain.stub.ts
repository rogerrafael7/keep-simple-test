import { DoLoginUseCaseDomain } from '@/domain/usecase/auth/do-login.usecase';

export const doLoginUseCaseDomainStub = {
  execute: jest.fn(),
} as unknown as DoLoginUseCaseDomain;
