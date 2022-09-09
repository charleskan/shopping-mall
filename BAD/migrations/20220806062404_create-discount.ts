import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("discount"))) {
        await knex.schema.createTable("discount", (table) => {
            table.increments();
            table.string("name").notNullable();
            table.float("value").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("discount");
}

