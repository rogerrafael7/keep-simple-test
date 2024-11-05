import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  SERVER_EXCEPTION_CODE,
  ServerException,
} from '@/infra/shared/exceptions/server.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof ServerException) {
      status = this.remapServerExceptionToHttpException(exception.code);
      message = exception.message;
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    response.status(status).json(errorResponse);
  }

  remapServerExceptionToHttpException(code: SERVER_EXCEPTION_CODE): number {
    switch (code) {
      case SERVER_EXCEPTION_CODE.INTERNAL_SERVER_ERROR:
        return HttpStatus.INTERNAL_SERVER_ERROR;
      case SERVER_EXCEPTION_CODE.NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case SERVER_EXCEPTION_CODE.UNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case SERVER_EXCEPTION_CODE.BAD_REQUEST:
        return HttpStatus.BAD_REQUEST;
      case SERVER_EXCEPTION_CODE.CONFLICT:
        return HttpStatus.CONFLICT;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
