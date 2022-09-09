import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("user", (table) => {
        table.increments();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        table.string("icon");
        table.string("nickname");
        table.integer("status_id").unsigned();
        table.foreign("status_id").references("status.id");
        table.integer("role_id").unsigned();
        table.foreign("role_id").references("role.id");
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user");
}

