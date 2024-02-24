export class Stage {
  constructor(client) {
    this._client = client;
  }

  async execute() {}
  async rollback() {}
}
