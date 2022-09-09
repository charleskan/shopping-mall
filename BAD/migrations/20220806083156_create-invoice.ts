import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("invoice"))) {
        await knex.schema.createTable("invoice", (table) => {
            table.increments();
            table.string("invoiceNumber").notNullable();
            table.integer("status_id").unsigned();
            table.foreign("status_id").references("status.id");
            table.integer("user_id").unsigned();
            table.foreign("user_id").references("user.id");
            table.integer("address_id").unsigned();
            table.foreign("address_id").references("address.id");
            table.float("totalPrice").notNullable();
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("invoice");
}

