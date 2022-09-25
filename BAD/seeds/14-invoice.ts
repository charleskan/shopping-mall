
import { Knex } from "knex";
import { Role, Status, Address } from "../models";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("invoice").del();

        await knex
        .insert([

        {


            invoiceNumber: "100001",
            status_id: Status.Unpaid,
            user_id: Role.Admin,
            address_id: Address.Default,
            totalPrice: "200",
  

        },
        {


            invoiceNumber: "100002",
            status_id: Status.Paid,
            user_id: Role.NormalUser,
            address_id: Address.Other,
            totalPrice: "100",
  

        },
        {


            invoiceNumber: "100003",
            status_id: Status.Paid,
            user_id: Role.VIP,
            address_id: Address.Other,
            totalPrice: "1000",
  

        }
    ])
    .into("invoice");

}