import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';
import { injectable } from 'inversify';

import { AuthController } from './modules/auth/auth.controller';

@injectable()
export class App {
  constructor(private authController: AuthController) {}

  public router(event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext) {
    const routes = {
      '/api/v1/auth/sign-up': () => this.authController.signUp.bind(this.authController),
    };

    const path = event.path as keyof typeof routes;
    return routes[path]()(event, context);
  }
}
