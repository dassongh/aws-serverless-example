import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';
import { inject, injectable } from 'inversify';

import { ExceptionFilter } from './common/exception.filter';
import { Types } from './common/types';
import { AuthController } from './modules/auth/auth.controller';

@injectable()
export class App {
  constructor(
    @inject(Types.ExceptionFilter) private exceptionFilter: ExceptionFilter,
    @inject(Types.AuthController) private authController: AuthController
  ) {}

  public router(event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext) {
    const routes = {
      '/api/v1/auth/sign-up': () => this.authController.signUp.bind(this.authController),
    };

    const path = event.path as keyof typeof routes;
    return routes[path]()(event, context).catch(error => this.exceptionFilter.catch(error, context.requestId));
  }
}
