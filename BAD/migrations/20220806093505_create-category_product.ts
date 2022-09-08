import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("category_product"))) {
        await knex.schema.createTable("category_product", (table) => {
            table.increments();
            table.integer("category_id").unsigned();
            table.foreign("category_id").references("category.id");

            table.integer("product_id").unsigned();
            table.foreign("product_id").references("product.id");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("category_product");
}
