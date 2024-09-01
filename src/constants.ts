import { join } from 'path';

export const DIRECTORIES = {
  APPS: join(import.meta.dirname, '../apps'),
  DIST: join(import.meta.dirname, '../dist'),
};
