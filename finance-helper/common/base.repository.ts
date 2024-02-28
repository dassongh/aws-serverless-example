import { injectable, unmanaged } from 'inversify';
import { TableValues } from '../constants';
import { ClientManager } from '../modules/database/client.manager';
import { DBError } from './custom-error';

@injectable()
export abstract class BaseRepository {
  constructor(
    protected clientManger: ClientManager,
    @unmanaged() private tableName: TableValues
  ) {}

  protected async find(filter: string, values: string[], select = '*', limit?: number, offset?: number) {
    const client = await this.clientManger.getClient();
    const sql = `
      SELECT ${select}
      FROM ${this.tableName}
      WHERE ${filter}
      ${limit && offset ? `LIMIT ${limit} OFFSET ${offset}` : ''}
    `;

    return client.query({ text: sql, values }).catch(error => {
      client.end();
      throw new DBError(error);
    });
  }
}
