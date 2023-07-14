// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('users', (table) => {
    table
      .uuid('uuid')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('password').notNullable().checkLength('>', 0);
    table.string('firstName');
    table.string('lastName');
    table
      .enu('role', ['ADMIN', 'COMPANY', 'USER'])
      .defaultTo('USER')
      .notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
