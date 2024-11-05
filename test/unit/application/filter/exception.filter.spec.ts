import { ArgumentsHost, HttpException } from '@nestjs/common';
import {
  SERVER_EXCEPTION_CODE,
  ServerException,
} from '@/infra/shared/exceptions/server.exception';
import { AllExceptionsFilter } from '@/application/filter/exceptions.filter';
import { hostStub, responseStub } from '../../__stubs__/express.stub';

describe('ExceptionFilter', () => {
  it.each([
    {
      error: new Error('Internal server error'),
      expectedStatus: 500,
      expectedMessage: 'Internal server error',
    },
    {
      error: new HttpException('Unauthorized', 403),
      expectedStatus: 403,
      expectedMessage: 'Unauthorized',
    },
    {
      error: new ServerException(
        'Custom not found',
        SERVER_EXCEPTION_CODE.NOT_FOUND,
      ),
      expectedStatus: 404,
      expectedMessage: 'Custom not found',
    },
    {
      error: new ServerException(
        'Custom Server Error',
        SERVER_EXCEPTION_CODE.INTERNAL_SERVER_ERROR,
      ),
      expectedStatus: 500,
      expectedMessage: 'Custom Server Error',
    },
    {
      error: new ServerException(
        'Custom Bad Request',
        SERVER_EXCEPTION_CODE.BAD_REQUEST,
      ),
      expectedStatus: 400,
      expectedMessage: 'Custom Bad Request',
    },
    {
      error: new ServerException(
        'Custom Unauthorized',
        SERVER_EXCEPTION_CODE.UNAUTHORIZED,
      ),
      expectedStatus: 401,
      expectedMessage: 'Custom Unauthorized',
    },
    {
      error: new ServerException(
        'TaxId already exists',
        SERVER_EXCEPTION_CODE.CONFLICT,
      ),
      expectedStatus: 409,
      expectedMessage: 'TaxId already exists',
    },
  ])(
    'should return correctly response when catch an error',
    ({ error, expectedStatus, expectedMessage }) => {
      const exceptionFilter = new AllExceptionsFilter();
      exceptionFilter.catch(error, hostStub as unknown as ArgumentsHost);
      expect(responseStub.status).toHaveBeenCalledWith(expectedStatus);
      expect(responseStub.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expectedMessage }),
      );
    },
  );
});
