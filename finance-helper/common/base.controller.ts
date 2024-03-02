import { APIGatewayProxyResult } from 'aws-lambda';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  protected json(requestId: string, response: any): APIGatewayProxyResult {
    console.log(response);

    return {
      statusCode: response.status || 200,
      body: JSON.stringify({
        requestId,
        data: response.payload,
      }),
    };
  }
}
