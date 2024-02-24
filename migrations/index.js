import { DatabaseClient } from './database-client.js';
import { MigrationMgr } from './migration-manager.js';
import { SecretsManager } from './secrets-manager.js';

async function bootstrap() {
  const secretsManager = new SecretsManager();
  const databaseClient = new DatabaseClient(secretsManager);
  const client = await databaseClient.getClient();
  await client.connect();

  const migrationMgr = new MigrationMgr(client);
  await migrationMgr.execute();

  await client.end();
}

bootstrap()
  .then(() => {
    console.log('done');
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
