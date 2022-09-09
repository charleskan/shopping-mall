import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("discount_product"))) {
        await knex.schema.createTable("discount_product", (table) => {
            table.increments();
            table.integer("discount_id").unsigned();
            table.foreign("discount_id").references("discount.id");
            table.integer("product_id").unsigned();
            table.foreign("product_id").references("product.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("discount_product");
}
