import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("discount_role"))) {
        await knex.schema.createTable("discount_role", (table) => {
            table.increments();
            table.integer("discount_id").unsigned();
            table.foreign("discount_id").references("discount.id");
            table.integer("role_id").unsigned();
            table.foreign("role_id").references("role.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("discount_role");
}