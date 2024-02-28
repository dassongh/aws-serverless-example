import { Container } from 'inversify';
import 'reflect-metadata';

import { Types } from './common/types';
import { AuthController } from './modules/auth/auth.controller';

import { App } from './app';
import { DatabaseService } from './modules/database/database.service';
import { IDatabaseService } from './modules/database/database.service.interface';
import { SecretsService } from './modules/secrets/secrets.service';
import { ISecretsService } from './modules/secrets/secrets.service.interface';
import { UserRepository } from './modules/user/user.repository';
import { IUserRepository } from './modules/user/user.repository.interface';
import { UserService } from './modules/user/user.service';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<IDatabaseService>(Types.DatabaseService).to(DatabaseService);
container.bind<ISecretsService>(Types.SecretsService).to(SecretsService);
container.bind<AuthController>(Types.AuthController).to(AuthController);
container.bind<UserService>(Types.UserService).to(UserService);
container.bind<IUserRepository>(Types.UserRepository).to(UserRepository);
container.bind<App>(Types.Application).to(App);

export { container };
