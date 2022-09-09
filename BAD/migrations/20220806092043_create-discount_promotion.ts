import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("discount_promotion"))) {
        await knex.schema.createTable("discount_promotion", (table) => {
            table.increments();
            table.integer("discount_id").unsigned();
            table.foreign("discount_id").references("discount.id");
            table.integer("promotion_id").unsigned();
            table.foreign("promotion_id").references("promotion.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("discount_promotion");
}