import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("product_size").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            product_id: 1,
            size_id: 1,
        },
        {
            product_id: 1,
            size_id: 2,
        },
        {
            product_id: 3,
            size_id: 3,
        }
        



    ])
        .into("product_size")


}