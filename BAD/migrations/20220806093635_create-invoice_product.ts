import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("invoice_product"))) {
        await knex.schema.createTable("invoice_product", (table) => {
            table.increments();
            table.integer("invoice_id").unsigned();
            table.foreign("invoice_id").references("invoice.id");

            table.integer("product_id").unsigned();
            table.foreign("product_id").references("product.id");

            table.integer("number").unsigned();
            table.integer("price").unsigned();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("invoice_product");
}
