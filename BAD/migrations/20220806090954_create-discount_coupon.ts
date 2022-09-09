import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("discount_coupon"))) {
        await knex.schema.createTable("discount_coupon", (table) => {
            table.increments();
            table.integer("discount_id").unsigned();
            table.foreign("discount_id").references("discount.id");
            table.integer("coupon_id").unsigned();
            table.foreign("coupon_id").references("coupon.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("discount_coupon");
}
