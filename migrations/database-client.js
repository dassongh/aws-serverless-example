import pg from 'pg';

export class DatabaseClient {
  #secretsManager;
  #secret;

  constructor(secretsManager) {
    this.#secretsManager = secretsManager;
  }

  async getClient() {
    if (!this.#secret) {
      this.#secret = await this.#secretsManager.getSecret('rds-credentials');
    }

    return new pg.Client({
      host: this.#secret.host,
      port: this.#secret.port,
      user: this.#secret.username,
      password: this.#secret.password,
      database: this.#secret.database,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
}
