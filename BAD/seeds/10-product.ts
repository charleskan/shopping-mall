import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("product").del();

        await knex
        .insert([

        {


            name: "Apple Watch",
            price: 100,
            image: "13.jpg",
            description: "Test",
            stock: 100,
            status_id: 1,
            // sizeId: sizeId,

        },
        {

            name: "Samsung Watch",
            price: 100,
            image: "14.jpg",
            description: "Test",
            stock: 100,
            status_id: 1,
            // sizeId: sizeId,
        },
        {
 
            name: "Nokia Watch",
            price: 100,
            image: "15.jpg",
            description: "Test",
            stock: 100,
            status_id: 1,
            // sizeId: sizeId,
        }
    ])
    .into("product");

}