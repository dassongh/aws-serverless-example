import { DatabaseClient } from './database-client.js';
import { MigrationManager } from './migration-manager.js';
import { SecretsManager } from './secrets-manager.js';

async function bootstrap() {
  const secretsManager = new SecretsManager();
  const databaseClient = new DatabaseClient(secretsManager);
  const client = await databaseClient.getClient();
  await client.connect();

  const migrationManager = new MigrationManager(client);
  await migrationManager.execute();

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
