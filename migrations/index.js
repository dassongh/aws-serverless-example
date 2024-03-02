import { DatabaseService } from './database.service.js';
import { MigrationService } from './migration.service.js';
import { SecretsService } from './secrets.service.js';

async function bootstrap() {
  const secretsService = new SecretsService();
  const databaseService = new DatabaseService(secretsService);
  const client = await databaseService.getClient();
  await client.connect();

  const migrationService = new MigrationService(client);
  await migrationService.execute();

  await client.end();
}

bootstrap()
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
