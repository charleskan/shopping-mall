import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("coupon"))) {
        await knex.schema.createTable("coupon", (table) => {
            table.increments();
            table.string("name").notNullable();
            table.integer("status_id").unsigned();
            table.foreign("status_id").references("status.id");
            table.integer("totalNumberOfCoupon").notNullable();
            table.timestamp("expiryDate");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("coupon");
}

