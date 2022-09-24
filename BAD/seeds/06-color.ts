import { Knex } from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    faker.seed(123);

    await knex("color").del();

    // Inserts seed entries
    for (let i = 0; i < 7; i++) {
        await knex.insert({
            name: faker.color.human(),
        }).into("color");
    }


}