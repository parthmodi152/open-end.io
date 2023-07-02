// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import knex from 'knex';
import type { Knex } from 'knex';
import type { Application } from './declarations';

declare module './declarations' {
  interface Configuration {
    postgresqlClient: Knex
  }
}

interface TypeA {
  key: string
  optionalKey: string | undefined
}

export const postgresql = (app: Application) => {
  const config = app.get('postgresql');

  if (!config) {
    throw new Error('PostgreSQL configuration missing');
  }

  const db = knex(config);

  app.set('postgresqlClient', db);
};
