import {
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { injectable } from 'inversify';

import { FetchError } from '../../common/custom-error';
import { ISecretsService } from './secrets.service.interface';

@injectable()
export class SecretsService implements ISecretsService {
  private client = new SecretsManagerClient({ region: process.env.region });

  getSecret<T>(secretName: string): Promise<T> {
    return this.client
      .send(new GetSecretValueCommand({ SecretId: secretName }))
      .then((res: GetSecretValueCommandOutput) => JSON.parse(res.SecretString as string))
      .catch(error => {
        console.error(error);
        throw new FetchError();
      });
  }
}
