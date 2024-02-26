import { inject, injectable } from 'inversify';

import { UserRepository } from './user.repository';

import { Types } from '../../common/types';

@injectable()
export class UserService {
  constructor(@inject(Types.UserRepository) private userRepository: UserRepository) {}
}
