import { Reflector } from '@nestjs/core';

export const reflectorStub = {
  getAllAndOverride: jest.fn(),
} as unknown as Reflector;
