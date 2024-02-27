import { inject, injectable } from 'inversify';

import { BaseController } from '../../common/base.controller';
import { Types } from '../../common/types';
import { UserService } from '../user/user.service';

@injectable()
export class AuthController extends BaseController {
  constructor(@inject(Types.UserService) private userService: UserService) {
    super();
  }

  public signUp(body: any) {
    const result = {
      statusCode: 200,
      payload: {
        message: 'success',
      },
    };

    this.respondWithJSON(result);
  }
}
