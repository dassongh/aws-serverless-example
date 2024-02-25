import { DBError } from '../../utils/customError.js';
import Logger from '../../utils/logger.js';
import ConnectionManagerSingleton from '../connectionManager.js';

import { SQL_RESERVED_WORDS } from '../../constants.js';

export default class BaseRepository {
  _connectionManager = new ConnectionManagerSingleton();
  _log = new Logger();

  constructor(tableName) {
    this._tableName = tableName;
  }

  async find(filter, params, select = '*', limit, offset) {
    const connection = this._connectionManager.getConnection();
    const sql = `
      SELECT ${select}
      FROM ${this._tableName}
      WHERE ${filter}
      ${limit && offset ? `LIMIT ${limit} OFFSET ${offset}` : ''}
    `;

    try {
      const { 0: result } = await connection.execute(sql, params);
      return result;
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async count(filter, params) {
    const connection = this._connectionManager.getConnection();
    const sql = `
      SELECT COUNT(*)
      FROM ${this._tableName}
      WHERE ${filter}
    `;

    try {
      const { 0: result } = await connection.execute(sql, params);
      return result[0]['COUNT(*)'];
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async findOne(filter, params, select = '*') {
    const connection = this._connectionManager.getConnection();
    const sql = `
      SELECT ${select}
      FROM ${this._tableName}
      WHERE ${filter}
    `;

    try {
      const { 0: result } = await connection.execute(sql, params);
      return result[0];
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async findById(id, select = '*') {
    const connection = this._connectionManager.getConnection();
    const sql = `
      SELECT ${select}
      FROM ${this._tableName}
      WHERE id = ?
    `;

    try {
      const { 0: result } = await connection.execute(sql, [id]);
      return result[0];
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async updateById(id, payload) {
    const connection = this._connectionManager.getConnection();
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const sql = `
      UPDATE ${this._tableName}
      SET ${this.#generateUpdateClause(keys)}
      WHERE id = ?
    `;

    try {
      const result = await connection.execute(sql, [...values, id]);
      return result;
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async update(filter, params, payload) {
    const connection = this._connectionManager.getConnection();
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const sql = `
      UPDATE ${this._tableName}
      SET ${this.#generateUpdateClause(keys)}
      WHERE ${filter}
    `;

    try {
      const result = await connection.execute(sql, [...values, ...params]);
      return result;
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async create(payload) {
    const connection = this._connectionManager.getConnection();
    const keys = Object.keys(payload);
    const values = Object.values(payload);
    const sql = `
      INSERT INTO ${this._tableName} (${keys.join(', ')})
      VALUES (${keys.map(() => '?').join(', ')})
    `;
    // Array(keys.length).fill('?');
    try {
      const { 0: result } = await connection.execute(sql, values);
      return result;
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async delete(filter, params) {
    const connection = this._connectionManager.getConnection();
    const sql = `
      DELETE FROM ${this._tableName}
      WHERE ${filter}
    `;

    try {
      const { 0: result } = await connection.execute(sql, params);
      return result;
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  async deleteById(id) {
    const connection = this._connectionManager.getConnection();
    const sql = `
      DELETE FROM ${this._tableName}
      WHERE id = ?
    `;

    try {
      const { 0: result } = await connection.execute(sql, [id]);
      return result;
    } catch (err) {
      await this._connectionManager.endConnection();
      throw this._logError(err);
    }
  }

  #generateUpdateClause(keys) {
    return keys
      .reduce((sql, key) => {
        if (SQL_RESERVED_WORDS.includes(key)) {
          return (sql += `\`${key}\` = ?,`);
        }
        return (sql += `${key} = ?,`);
      }, '')
      .slice(0, -1);
  }

  _logError(err) {
    this._log.error(err);
    return new DBError(err);
  }
}
