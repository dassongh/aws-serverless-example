import { injectable, unmanaged } from 'inversify';
import { QueryResultRow } from 'pg';

import { DBError } from './custom-error';
import { CreateDto } from './interfaces';

import { TableValues } from '../constants';
import { ClientManager } from '../modules/database/client.manager';

@injectable()
export abstract class BaseRepository {
  constructor(
    protected clientManager: ClientManager,
    @unmanaged() private tableName: TableValues
  ) {}

  public async create<T extends CreateDto, R extends QueryResultRow>(payload: T, returning = '*'): Promise<R> {
    const client = await this.clientManager.getClient();
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const sql = `
      INSERT INTO ${this.tableName} (${keys.join(', ')})
      VALUES (${keys.map((_, index) => '$' + (index + 1)).join(', ')})
      RETURNING ${returning}
    `;

    return client
      .query<R>({ text: sql, values })
      .then(result => result.rows[0])
      .catch(async error => {
        await client.end();
        throw new DBError(error);
      });
  }

  public async find<R extends QueryResultRow>(
    filter: string,
    values: string[],
    select = '*',
    limit?: number,
    offset?: number
  ): Promise<R[]> {
    const client = await this.clientManager.getClient();
    const sql = `
      SELECT ${select}
      FROM ${this.tableName}
      WHERE ${filter}
      ${limit && offset ? `LIMIT ${limit} OFFSET ${offset}` : ''}
    `;

    return client
      .query({ text: sql, values })
      .then(result => result.rows)
      .catch(async error => {
        await client.end();
        throw new DBError(error);
      });
  }

  public async findById<R extends QueryResultRow>(id: number | string, select = '*'): Promise<R> {
    const client = await this.clientManager.getClient();
    const sql = `
      SELECT ${select}
      FROM ${this.tableName}
      WHERE id = $1
    `;

    return client
      .query({ text: sql, values: [id] })
      .then(result => result.rows[0])
      .catch(async error => {
        await client.end();
        throw new DBError(error);
      });
  }
}
