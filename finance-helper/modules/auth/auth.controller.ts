import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';
import { inject, injectable } from 'inversify';

import { BaseController } from '../../common/base.controller';
import { Types } from '../../common/types';
import { UserService } from '../user/user.service';

@injectable()
export class AuthController extends BaseController {
  constructor(@inject(Types.UserService) private userService: UserService) {
    super();
  }

  public signUp(event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext) {
    const result = {
      statusCode: 200,
      payload: {
        message: 'success',
      },
    };

    return this.json(result);
  }
}
