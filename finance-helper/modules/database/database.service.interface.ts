import pg from 'pg';

export interface IDatabaseService {
  getPool(): Promise<pg.Pool>;
}

export interface DatabaseCredentials {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
