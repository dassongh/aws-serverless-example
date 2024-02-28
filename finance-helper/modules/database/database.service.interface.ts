import pg from 'pg';

export interface IDatabaseService {
  getClient(): Promise<pg.Client>;
}

export interface DatabaseCredentials {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
