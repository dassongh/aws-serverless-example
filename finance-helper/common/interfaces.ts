import { CreateUserDto } from '../modules/user/dto';

export interface PgError extends Error {
  code: string;
  message: string;
}

export type CreateDto = CreateUserDto;
