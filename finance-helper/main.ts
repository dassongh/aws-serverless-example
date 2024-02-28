import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { App } from './app';
import { Types } from './common/types';
import { container } from './inversify.config';

export async function handler(
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
  console.log(event, context);
  const app = container.get<App>(Types.Application);
  return app.router(event, context);
}
