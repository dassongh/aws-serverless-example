import { Container } from 'inversify';
import 'reflect-metadata';

import { Types } from './common/types';
import { AuthController } from './modules/auth/auth.controller';

import { App } from './app';
import { ExceptionFilter } from './common/exception.filter';
import { AuthService } from './modules/auth/auth.service';
import { ClientManager } from './modules/database/client.manager';
import { DatabaseService } from './modules/database/database.service';
import { IDatabaseService } from './modules/database/database.service.interface';
import { SecretsService } from './modules/secrets/secrets.service';
import { ISecretsService } from './modules/secrets/secrets.service.interface';
import { IUserRepository } from './modules/user/interfaces/user.repository';
import { UserRepository } from './modules/user/user.repository';
import { UserService } from './modules/user/user.service';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<IDatabaseService>(Types.DatabaseService).to(DatabaseService);
container.bind<ClientManager>(Types.ClientManager).to(ClientManager);
container.bind<ISecretsService>(Types.SecretsService).to(SecretsService);
container.bind<AuthController>(Types.AuthController).to(AuthController);
container.bind<AuthService>(Types.AuthService).to(AuthService);
container.bind<UserService>(Types.UserService).to(UserService);
container.bind<IUserRepository>(Types.UserRepository).to(UserRepository);
container.bind<ExceptionFilter>(Types.ExceptionFilter).to(ExceptionFilter);
container.bind<App>(Types.Application).to(App);

export { container };
