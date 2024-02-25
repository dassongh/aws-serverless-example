export interface PgError extends Error {
  code: string;
  message: string;
}
