import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("user_address"))) {
        await knex.schema.createTable("user_address", (table) => {
            table.increments();
            table.integer("address_id").unsigned();
            table.foreign("address_id").references("address.id");
            table.integer("user_id").unsigned();
            table.foreign("user_id").references("user.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_address");
}