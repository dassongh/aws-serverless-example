import { pbkdf2 } from 'node:crypto';
import { promisify } from 'node:util';

import { inject, injectable } from 'inversify';

import { CreateUserDto, GetUserDto } from '../user/dto';
import { UserRepository } from '../user/user.repository';

import { Types } from '../../common/types';
import { ClientManager } from '../database/client.manager';
import { ISecretsService } from '../secrets/secrets.service.interface';

@injectable()
export class AuthService {
  private salt: string | undefined;
  constructor(
    @inject(Types.UserRepository) private userRepository: UserRepository,
    @inject(Types.SecretsService) private secretsService: ISecretsService,
    @inject(Types.ClientManager) private clientManager: ClientManager
  ) {}

  public async signUp(dto: CreateUserDto): Promise<GetUserDto> {
    const payload = { ...dto, password: await this.hashPassword(dto.password) };

    await this.clientManager.connect();
    const user = await this.userRepository.create<CreateUserDto, GetUserDto>(payload, 'id, name, email');

    await this.clientManager.end();
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    if (!this.salt) {
      this.salt = (await this.secretsService.getSecret<{ salt: string }>('auth-salt')).salt;
    }

    return promisify(pbkdf2)(password, this.salt, 1000, 64, 'sha512').then(hash => hash.toString('hex'));
  }
}
