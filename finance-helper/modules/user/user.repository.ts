import { inject, injectable } from 'inversify';

import { IUserRepository } from './interfaces';

import { BaseRepository } from '../../common/base.repository';
import { Types } from '../../common/types';
import { Table } from '../../constants';
import { ClientManager } from '../database/client.manager';

@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
  constructor(@inject(Types.ClientManager) clientManager: ClientManager) {
    super(clientManager, Table.Users);
  }
}
