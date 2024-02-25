export interface ISecretsService {
  getSecret<T>(secretName: string): Promise<T>;
}
