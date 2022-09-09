import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("product_color").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            product_id: 1,
            color_id: 1,
        },
        {
            product_id: 1,
            color_id: 2,
        },
        {
            product_id: 3,
            color_id: 3,
        },
        {
            product_id: 2,
            color_id: 3,
        }



        



    ])
        .into("product_color")


}