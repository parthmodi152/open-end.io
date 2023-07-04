// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('analysis', (table) => {
    table.string('orderId').unique().notNullable();
    table.string('projectId').notNullable();
    table.integer('creditsUsed').notNullable();
    table.string('startedBy').notNullable();
    table.timestamp('startedAt').defaultTo(knex.fn.now());
    table.boolean('status').defaultTo(false);
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('analysis')
}
