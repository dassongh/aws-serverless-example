import { inject, injectable } from 'inversify';
import pg from 'pg';

import { ISecretsService } from '../secrets/secrets.service.interface';
import { DatabaseCredentials, IDatabaseService } from './database.service.interface';

import { Types } from '../../common/types';

@injectable()
export class DatabaseService implements IDatabaseService {
  private secret: DatabaseCredentials | undefined;

  constructor(@inject(Types.SecretsService) private secretsService: ISecretsService) {}

  public async getClient() {
    if (!this.secret) {
      this.secret = await this.secretsService.getSecret<DatabaseCredentials>('rds-credentials');
    }

    return new pg.Client({
      host: this.secret.host,
      port: this.secret.port,
      user: this.secret.username,
      password: this.secret.password,
      database: this.secret.database,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
}
