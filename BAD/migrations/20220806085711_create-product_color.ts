import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("product_color"))) {
        await knex.schema.createTable("product_color", (table) => {
            table.increments();
            table.integer("color_id").unsigned();
            table.foreign("color_id").references("color.id");

            table.integer("product_id").unsigned();
            table.foreign("product_id").references("product.id");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("product_color");
}

