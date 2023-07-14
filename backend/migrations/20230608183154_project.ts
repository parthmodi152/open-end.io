// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('project', (table) => {
    table
      .uuid('uuid')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('description').nullable();
    table.jsonb('config').nullable().defaultTo('{}');
    table.boolean('isArchive').defaultTo(false);
    table
      .uuid('companyUuid')
      .references('uuid')
      .inTable('companies')
      .onDelete('CASCADE'); // Add this line to enable cascading delete
    table
      .uuid('createdBy')
      .references('uuid')
      .inTable('users');
    table.string('dataFileUrl').nullable();
    table.string('resultFileUrl').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('project');
}
