import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("promotion"))) {
        await knex.schema.createTable("promotion", (table) => {
            table.increments();
            table.string("name");
            table.integer("status_id").unsigned();
            table.foreign("status_id").references("status.id");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("promotion");

}

