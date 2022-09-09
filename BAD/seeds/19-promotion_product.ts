import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("promotion_product").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            promotion_id: 1,
            product_id: 1,
            freebie_id: 2,
            product_number: 3,
            freebie_number: 2,
            freebie_price: 0
        },
        {
            promotion_id: 2,
            product_id: 2,
            freebie_id: 3,
            product_number: 2,
            freebie_number: 1,
            freebie_price: 0
        },
        {
            promotion_id: 3,
            product_id: 3,
            freebie_id: 1,
            product_number: 1,
            freebie_number: 1,
            freebie_price: 0
        },
        
        



    ])
        .into("promotion_product")


}