import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("color"))) {
        await knex.schema.createTable("color", (table) => {
            table.increments();
            table.string("name");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("color");
}

