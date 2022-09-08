import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("coupon_user"))) {
        await knex.schema.createTable("coupon_user", (table) => {
            table.increments();
            table.integer("user_id").unsigned();
            table.foreign("user_id").references("user.id");
            table.integer("coupon_id").unsigned();
            table.foreign("coupon_id").references("coupon.id");
            table.integer("status_id").unsigned();
            table.foreign("status_id").references("status.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("coupon_user");
}