import pg from 'pg';

import { injectable, unmanaged } from 'inversify';
import { TableValues } from '../constants';
import { DBError } from './custom-error';

@injectable()
export abstract class BaseRepository {
  constructor(
    private client: pg.PoolClient,
    @unmanaged() private tableName: TableValues
  ) {}

  protected find(filter: string, values: string[], select = '*', limit?: number, offset?: number) {
    const sql = `
      SELECT ${select}
      FROM ${this.tableName}
      WHERE ${filter}
      ${limit && offset ? `LIMIT ${limit} OFFSET ${offset}` : ''}
    `;

    return this.client.query({ text: sql, values }).catch(error => {
      this.client.release();
      throw new DBError(error);
    });
  }
}
