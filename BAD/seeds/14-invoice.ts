import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("invoice").del();

        await knex
        .insert([

        {


            invoiceNumber: "ABC001",
            status_id: 1,
            user_id: 1,
            address_id: 1,
            totalPrice: "200",
  

        },
        {


            invoiceNumber: "ABC002",
            status_id: 1,
            user_id: 2,
            address_id: 2,
            totalPrice: "100",
  

        },
        {


            invoiceNumber: "ABC003",
            status_id: 1,
            user_id: 3,
            address_id: 2,
            totalPrice: "1000",
  

        }
    ])
    .into("invoice");

}