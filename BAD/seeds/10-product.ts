import { Knex } from "knex";
import { faker } from '@faker-js/faker';


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries

        faker.seed(123);

        await knex('product').del();
    
        for (let i = 0; i < 100; i++) {
            await knex.insert({
                name: faker.commerce.productAdjective() + ' ' + faker.commerce.productName(),
                icon: faker.image.imageUrl(),
                description: faker.commerce.productDescription(),
                image1: faker.image.imageUrl(),
                image2: faker.image.imageUrl(),
                image3: faker.image.imageUrl(),
            }).into('product');
        }

}