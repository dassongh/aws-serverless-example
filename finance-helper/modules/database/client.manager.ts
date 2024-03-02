import { inject, injectable } from 'inversify';
import { Client } from 'pg';

import { IDatabaseService } from './database.service.interface';

import { CustomError, DBError } from '../../common/custom-error';
import { Types } from '../../common/types';

@injectable()
export class ClientManager {
  private client: Client | undefined;
  constructor(@inject(Types.DatabaseService) private databaseService: IDatabaseService) {}

  public async getClient(): Promise<Client> {
    if (!this.client) {
      throw new CustomError(500, 'Database not connected');
    }

    return this.client;
  }

  public async end() {
    if (!this.client) return;
    await this.client.end();
  }

  public async connect() {
    if (!this.client) {
      try {
        this.client = await this.databaseService.getClient();
        await this.client.connect();
      } catch (error) {
        throw new DBError(error);
      }
    }
  }
}
