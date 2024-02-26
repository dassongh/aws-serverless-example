import { inject, injectable } from 'inversify';
import pg from 'pg';

import { IUserRepository } from './user.repository.interface';

import { BaseRepository } from '../../common/base.repository';
import { Types } from '../../common/types';

@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
  constructor(@inject(Types.PgClient) client: pg.PoolClient) {
    super(client, 'users');
  }
}
