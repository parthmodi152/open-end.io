// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('analysis', (table) => {
    table
      .uuid('orderId')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('projectId').notNullable();
    table.decimal('creditsUsed', 10, 2).notNullable();
    table.uuid('startedBy').notNullable();
    table.timestamp('startedAt').defaultTo(knex.fn.now());
    table.boolean('status').defaultTo(false);
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('analysis')
}
