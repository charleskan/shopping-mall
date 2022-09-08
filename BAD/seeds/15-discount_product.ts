import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("discount_product").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            product_id: 1,
            discount_id: 1,
        },
        {
            product_id: 1,
            discount_id: 2,
        },
        {
            product_id: 3,
            discount_id: 3,
        }


    ])
        .into("discount_product")


}