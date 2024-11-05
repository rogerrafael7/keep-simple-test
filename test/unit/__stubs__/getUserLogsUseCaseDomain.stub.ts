import { GetUserLogsUseCaseDomain } from '@/domain/usecase/user/get-user-logs.usercase';

export const getUserLogsUseCaseDomainStub = {
  execute: jest.fn(),
} as unknown as GetUserLogsUseCaseDomain;
