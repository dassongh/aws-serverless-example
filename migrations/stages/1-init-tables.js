import { Stage } from './stage.abstract.js';

export class InitTables extends Stage {
  constructor(client) {
    super(client);
  }

  async execute() {
    try {
      await this._client.query('BEGIN');

      await this._client.query(`
        CREATE TABLE IF NOT EXISTS public.user (
	        id serial4 NOT NULL,
	        "name" varchar NOT NULL,
	        email varchar NOT NULL,
	        "password" varchar NOT NULL,
      	  CONSTRAINT user_pk PRIMARY KEY (id)
        );
      `);

      await this._client.query('COMMIT');
    } catch (error) {
      await this._client.query('ROLLBACK');
      throw error;
    } finally {
      await this._client.end();
    }
  }
}
