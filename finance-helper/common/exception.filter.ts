import { injectable } from 'inversify';
import { CustomError } from './custom-error';

@injectable()
export class ExceptionFilter {
  catch(error: any, requestId: string) {
    if (error instanceof CustomError) {
      return {
        statusCode: error.status,
        body: JSON.stringify({
          error: {
            requestId,
            type: error.type,
            message: error.message,
          },
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: {
            requestId,
            type: 'Internal Server Error',
            message: 'Internal Server Error',
          },
        }),
      };
    }
  }
}
