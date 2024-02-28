import { APIGatewayProxyResult } from 'aws-lambda';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  protected json(response: any): APIGatewayProxyResult {
    console.log(response);

    return {
      statusCode: response.statusCode,
      body: JSON.stringify({
        data: response.payload,
      }),
    };
  }

  protected error(error: any) {
    console.error(error);

    return {
      statusCode: error.status || 500,
      body: JSON.stringify({
        error: {
          type: error.type || 'Internal Server Error',
          message: error.message || 'Internal Server Error',
        },
      }),
    };
  }
}
