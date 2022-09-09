import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("brand_product").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            brand_id: 1,
            product_id: 1,
        },
        {
            brand_id: 1,
            product_id: 2,
        },
        {
            brand_id: 3,
            product_id: 3,
        }
        



    ])
        .into("brand_product")


}