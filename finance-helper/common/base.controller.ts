import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  protected respondWithJSON(response: any) {
    console.log(response);

    const body = JSON.stringify({
      result: 'success',
      // requestId: context.requestId,
      body: response.payload,
    });

    return {
      statusCode: response.statusCode,
      body,
    };
  }

  protected respondWithError(error: any) {
    console.error(error);

    const body = JSON.stringify({
      result: 'error',
      // requestId: context.requestId,
      error: {
        type: error.type || 'Internal Server Error',
        message: error.message || 'Internal Server Error',
      },
    });

    return {
      statusCode: error.status || 500,
      body,
    };
  }
}
