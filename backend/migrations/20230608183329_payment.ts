// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('payment', (table) => {
    table
      .uuid('uuid')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.enu('type', ['INCOME', 'EXPENSE']).notNullable();
    table
      .uuid('companyUuid')
      .references('uuid')
      .inTable('companies')
      .notNullable();
    table.uuid('userUuid').references('uuid').inTable('users');
    table.decimal('amount', 10, 2).notNullable();
    table.decimal('balance', 10, 2).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('payment');
}
