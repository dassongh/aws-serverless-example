import { inject, injectable } from 'inversify';
import pg from 'pg';

import { IDatabaseService } from './database.service.interface';

import { DBError } from '../../common/custom-error';
import { Types } from '../../common/types';

@injectable()
export class ClientManager {
  private client: pg.Client | undefined;
  constructor(@inject(Types.DatabaseService) private databaseService: IDatabaseService) {}

  public async getClient(): Promise<pg.Client> {
    await this.connect();
    return this.client as pg.Client;
  }

  private async connect() {
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
