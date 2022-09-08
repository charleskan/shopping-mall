import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("address"))) {
        await knex.schema.createTable("address", (table) => {
            table.increments();
            table.string("name");
            table.integer("address_id");
            
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("address");
}

