import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

export class SecretsManager {
  #client = new SecretsManagerClient({ region: process.env.region });

  getSecret(secretName) {
    return this.#client
      .send(new GetSecretValueCommand({ SecretId: secretName }))
      .then(res => JSON.parse(res.SecretString))
      .catch(error => {
        console.error(error);
        process.exit(1);
      });
  }
}
