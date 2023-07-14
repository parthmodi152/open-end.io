// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('companies', (table) => {
    table
      .uuid('uuid')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable().checkLength('>', 0).unique();
    table.decimal('credit', 10, 2).nullable().defaultTo(0);
  });
  await knex.schema.alterTable('users', (table) => {
    table.uuid('companyUuid').references('uuid').inTable('companies');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('companyUuid');
  });
  await knex.schema.dropTable('companies');
}
