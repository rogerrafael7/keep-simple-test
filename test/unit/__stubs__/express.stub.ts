import { ExecutionContext } from '@nestjs/common';

export const responseStub = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

export const hostStub = {
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({ url: '/test-url', headers: {} }),
    getResponse: () => responseStub,
  }),
};

export const executionContextStub = {
  ...hostStub,
  getHandler: jest.fn(),
  getClass: jest.fn(),
} as unknown as ExecutionContext;
