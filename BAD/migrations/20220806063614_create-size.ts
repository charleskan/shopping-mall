import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("size"))) {
        await knex.schema.createTable("size", (table) => {
            table.increments();
            table.string("name").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("size");
}

