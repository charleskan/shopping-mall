import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("brand"))) {
        await knex.schema.createTable("brand", (table) => {
            table.increments();
            table.string("name");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("brand");
}

