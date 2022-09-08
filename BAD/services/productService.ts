import  { Knex } from 'knex'
import { Product } from '../models'


export class ProductPriceError extends Error {
	constructor(msg?: string) {
		super(msg)
		Object.setPrototypeOf(this, ProductPriceError.prototype)
	}
}

export class ProductStockError extends Error {
	constructor(msg?: string) {
		super(msg)
		Object.setPrototypeOf(this, ProductStockError.prototype)
	}
}

export class ProductNameError extends Error {
	constructor(msg?: string) {
		super(msg)
		Object.setPrototypeOf(this, ProductNameError.prototype)
	}
}

	export class ProductService {
		constructor(private knex: Knex) {
		}


	// -------------------------------------------------------------------------------------------------------------------
	// Get All Product Info
	// -------------------------------------------------------------------------------------------------------------------

	async allProductInfo() {

		{
			const productInfo = await this.knex<Product>("product")
			.select('*')
			// `SELECT * FROM product INNER JOIN product_color pc ON
			// product.id = pc.product_id`

			
			return productInfo
		}

	}




	// -------------------------------------------------------------------------------------------------------------------
	// Get individual Product Info
	// -------------------------------------------------------------------------------------------------------------------

	async productInfo(productId: number) {

        //console.log(this.tableName)
			{

        	const productInfo = await this.knex<Product>("product")
			.select('*')
			.where("id" , productId)//.andWhere( "status_id", 1)

			const productColorInfo = await this.knex
			.raw(
				
				`select * from color
				where id in (
				select color_id from product_color where product_id = ?)`,[productId])

			const productSizeInfo = await this.knex
			.raw(
				
				`select * from size
				where id in (
				select size_id from product_size where product_id = ?)`,[productId])

			


			return {product:productInfo, color:productColorInfo, size:productSizeInfo}
			}
    }





	// -------------------------------------------------------------------------------------------------------------------
	// Create New Product
	// -------------------------------------------------------------------------------------------------------------------

	async createProduct(
		name: string,
		price: number, 
		image: string,
		description:string,
		stock:number,
		status_id:number
		) {
		// insert new product


		
	{	if (!name) {
			throw new ProductNameError()
		}
		
		if (price < 0) {
			throw new ProductPriceError()
		} 

		if (stock < 0 )  {
			throw new ProductStockError()
		}
		
		
	
		else{

		const newProductRecord = await this.knex<Product>("product").insert
		(
			{
			name: name,
			price: price,
			image: image,
			description: description,
			stock: stock,
			status_id: status_id,
			
			}
		)
		.returning('*')

		return newProductRecord;
	}
	}
	}



	// -------------------------------------------------------------------------------------------------------------------
	// Update Product
	// -------------------------------------------------------------------------------------------------------------------

	async updateProduct(
		   productId: number,
		   newName: string,
		   newPrice: number,
		   newImage: string,
		   newDescription:string,
		   newStatus_id:number,
		   newStock:number
		) {

		{
			

			if (!newName) {
				throw new ProductNameError()
			}
			
			if (newPrice < 0) {
				throw new ProductPriceError()
			} 
	
			if (newStock < 0 )  {
				throw new ProductStockError()
			}

			
				const productRecord = await this.knex<Product>("product")
				
				.update({

				name: newName, 
				price: newPrice,
				image: newImage,
				description: newDescription,
				status_id: newStatus_id,
				stock: newStock
				
			})

				.where('id', productId)
				.returning('*')

			return productRecord
		}
	


	}

	// -------------------------------------------------------------------------------------------------------------------
	// Delete Product
	// -------------------------------------------------------------------------------------------------------------------

	async deleteProduct(productId: number) {
		{
			const productRecord = await this.knex<Product>("product")
				.update('status_id', 2)
				.where('id', productId)
				.returning('*')

			return productRecord;
		}
	}

	// -------------------------------------------------------------------------------------------------------------------
	// create promotion
	// -------------------------------------------------------------------------------------------------------------------
	async createPromotion(promotion: string) {
		{
			const promotionRecord = await this.knex('promotion')
				.insert({
				'status_id': 1,
				 'name': promotion})
				.returning('*')

			return promotionRecord;
		}
		
	}

	// -------------------------------------------------------------------------------------------------------------------
	// create promotion details (promotion_product)
	// -------------------------------------------------------------------------------------------------------------------

	async createPromotionDetails(
		promotion_id: number,
		product_id: number, 
		product_number: number, 
		freebie_id: number, 
		freebie_number: number
		) {

		{
			const promotionDetails = await this.knex('promotion_product')
				.insert({
				'promotion_id': promotion_id, 
				'product_id': product_id,
				'product_number': product_number, 
				'freebie_id': freebie_id,
				'freebie_number': freebie_number,
				'freebie_price' : 0
			})
				.returning('*')
	
			return promotionDetails;
		}
	}

	// -------------------------------------------------------------------------------------------------------------------
	// search productIdByName
	// -------------------------------------------------------------------------------------------------------------------

	async searchProductIdByName(keyword: string) {
		{
			const productId = await this.knex.raw(`

				SELECT * FROM product WHERE name ILIKE ? order by updated_at desc
			`, ['%' + keyword + '%'])

			return productId;
		}
	}

	// -------------------------------------------------------------------------------------------------------------------
	// get productIdByName
	// -------------------------------------------------------------------------------------------------------------------

	async productIdByName(name: string) {
		{
			const productId = await this.knex.raw(`

				SELECT * FROM product WHERE name = ?
			`, [name])

			return productId;
		}
	}


}
