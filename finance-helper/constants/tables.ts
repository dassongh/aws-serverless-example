export const Table = {
  Users: 'users',
} as const;

export type TableValues = (typeof Table)[keyof typeof Table];
