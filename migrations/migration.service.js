import { InitTables } from './stages/index.js';

export class MigrationService {
  #client;
  #stages;

  constructor(client) {
    this.#client = client;
    this.#stages = [new InitTables(this.#client)];
  }

  async execute() {
    for (const stage of this.#stages) {
      await stage.execute();
    }
  }
}
