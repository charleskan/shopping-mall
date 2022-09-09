import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("product", (table) => {
        table.increments();
        table.string("name").notNullable();
        table.float("price").notNullable();
        table.string("image").notNullable();
        table.string("description");
        table.integer("status_id").unsigned();
        table.foreign("status_id").references("status.id");
        table.integer("stock").notNullable();
        table.integer("size_id").unsigned();
        table.foreign("size_id").references("size.id");
        table.timestamps(true, true);
    });
    
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("product");
}

