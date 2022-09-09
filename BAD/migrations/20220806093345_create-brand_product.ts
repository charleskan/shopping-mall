import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("brand_product"))) {
        await knex.schema.createTable("brand_product", (table) => {
            table.increments();
            table.integer("brand_id").unsigned();
            table.foreign("brand_id").references("brand.id");

            table.integer("product_id").unsigned();
            table.foreign("product_id").references("product.id");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("brand_product");
}
