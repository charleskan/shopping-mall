import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("promotion_product"))) {
        await knex.schema.createTable("promotion_product", (table) => {
            table.increments();
            table.integer("promotion_id").unsigned();
            table.foreign("promotion_id").references("promotion.id");
            table.integer("product_id").unsigned();
            table.foreign("product_id").references("product.id");
            table.integer("freebie_id").unsigned();
            table.integer("product_number").unsigned();
            table.integer("freebie_number").unsigned();
            table.integer("freebie_price").unsigned();

        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("promotion_product");
}