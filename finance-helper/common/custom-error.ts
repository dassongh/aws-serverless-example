import { ErrorTypes } from '../constants';

export class CustomError extends Error {
  constructor(
    public status: number,
    public message: string,
    public type: keyof typeof ErrorTypes = ErrorTypes.Custom
  ) {
    super(message);
  }
}

export class DBError extends CustomError {
  private static DUPLICATE_UNIQUE_KEY_ERROR = 23505;
  private static FOREIGN_KEY_CONSTRAINT_ERROR = 23503;
  private static RELATION_KEY_NOT_EXIST = 23502;

  constructor(error: any) {
    console.error('DBError: ', error);
    const errorEntity = DBError.getErrorEntity(error);
    super(errorEntity.statusCode, errorEntity.message, ErrorTypes.Database);
  }

  private static getErrorEntity(error: any) {
    const entity = {
      [DBError.DUPLICATE_UNIQUE_KEY_ERROR]: { statusCode: 409, message: 'Duplicate value' },
      [DBError.FOREIGN_KEY_CONSTRAINT_ERROR]: { statusCode: 400, message: 'Foreign key constraint' },
      [DBError.RELATION_KEY_NOT_EXIST]: { statusCode: 400, message: 'Relation key not exist' },
      default: { statusCode: 500, message: 'Internal Server Error' },
    };

    return entity[Number(error.code)] || entity.default;
  }
}

export class AuthError extends CustomError {
  constructor() {
    super(401, 'Unauthorized', ErrorTypes.Authorization);
  }
}

export class FetchError extends CustomError {
  constructor(message = 'Error with fetching data') {
    super(424, message, ErrorTypes.Fetch);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message, ErrorTypes.NotFound);
  }
}
