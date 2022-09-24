import { Knex } from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    faker.seed(123);

    await knex('productDetail').del();

    for (let i = 0; i < 100; i++) {
        await knex.insert({
            product_id: faker.datatype.number({min: 1, max: 100}),
            color_id: faker.datatype.number({min: 1, max: 7}),
            size_id: faker.datatype.number({min: 1, max: 7}),
            price: faker.datatype.number({min: 100, max: 999, precision: 1}),
            stock: faker.datatype.number({min: 100, max: 900}),
            status_id: faker.datatype.number({ min: 1, max: 1 }),
        }).into('productDetail');
    }


}