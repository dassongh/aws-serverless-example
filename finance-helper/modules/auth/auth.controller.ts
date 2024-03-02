import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';
import { inject, injectable } from 'inversify';

import { AuthService } from './auth.service';

import { BaseController } from '../../common/base.controller';
import { Types } from '../../common/types';
import { CreateUserDto } from '../user/dto';

@injectable()
export class AuthController extends BaseController {
  constructor(@inject(Types.AuthService) private authService: AuthService) {
    super();
  }

  public async signUp(event: APIGatewayProxyEvent, context: APIGatewayEventRequestContext) {
    const createUserDto = JSON.parse(event.body as string) as CreateUserDto;
    const user = await this.authService.signUp(createUserDto);
    return this.json(context.requestId, { status: 201, payload: user });
  }
}
