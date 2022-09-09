import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("size").del();

    // Inserts seed entries
    await knex
    
    .insert([
        { 
            

            name: "S",

        },
        {

            name: "M",
        },
        {

            name: "L",
        }



    ])
        .into("size")


}