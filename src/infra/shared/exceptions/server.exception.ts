export enum SERVER_EXCEPTION_CODE {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
}

export class ServerException extends Error {
  constructor(
    message: string,
    public readonly code: SERVER_EXCEPTION_CODE = SERVER_EXCEPTION_CODE.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
  }
}
