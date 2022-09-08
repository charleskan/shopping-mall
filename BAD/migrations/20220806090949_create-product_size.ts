import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("product_size"))) {
        await knex.schema.createTable("product_size", (table) => {
            table.increments();
            table.integer("size_id").unsigned();
            table.foreign("size_id").references("size.id");

            table.integer("product_id").unsigned();
            table.foreign("product_id").references("product.id");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("product_size");
}
