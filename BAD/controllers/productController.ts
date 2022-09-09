
import express from 'express'

import { logger } from '../logger'
import { form } from '../middleware'
import {
	ProductPriceError,
	ProductStockError,
	ProductService
} from '../services/productService'

export class ProductController {
	constructor(private productService: ProductService) {}


    // -------------------------------------------------------------------------------------------------------------------
	// get All product info
	// -------------------------------------------------------------------------------------------------------------------

    allProductInfo = async (req: express.Request, res: express.Response,) => {
		try {
			const allProductInfo = await this.productService.allProductInfo()
			return res.json({
				result: true,
				msg: 'Get Product ALL Information success',
				allProductInfo
			})
		} catch (err) {
			logger.error(err)
			return res.json({ result: false, msg: 'Get All Product Information fail' })
		}
	}

    // -------------------------------------------------------------------------------------------------------------------
	// get product info
	// -------------------------------------------------------------------------------------------------------------------

     productInfo = async (req: express.Request, res: express.Response,) => {
		const productId = Number(req.params.id)
		try {
			const productInfo = await this.productService.productInfo(productId)
			return res.json({
				result: true,
				msg: 'Get Product Information success',
				productInfo: productInfo.product,
				productColor: productInfo.color.rows,
				productSize: productInfo.size.rows
			})
		} catch (err) {

		
		logger.error(err)
			
			res.status(500).json({ result: false, msg: 'Get Product Information fail' })
			return 
		}
	}

    // -------------------------------------------------------------------------------------------------------------------
	// create Product
	// -------------------------------------------------------------------------------------------------------------------

    createProduct = async (req: express.Request, res: express.Response) => {
		form.parse(req, async (err, fields, files) => {
    

    try {
        const name = fields.name != null && !Array.isArray(fields.name)
			? fields.name
			: err

		
        const price = fields.price	!= null && !Array.isArray(fields.price)
			? fields.price
			: err

        let image = files.image   != null && !Array.isArray(files.image)
			? files.image.newFilename
			: err

        const description = fields.description	!= null && !Array.isArray(fields.description)
			? fields.description
			: err


        const stock = fields.stock		!= null && !Array.isArray(fields.stock)
			? fields.stock
			: err


        const status_id = 1


        await this.productService.createProduct(name, price, image, description, stock, status_id)
            return res.json({ result: true, msg: 'create new product success' })

    } catch (err) {
        

        if (err instanceof ProductPriceError) {
            return res.status(500).json({result: false, msg: 'Product price must be greater than 0'})

		
		} else if (err instanceof ProductStockError) {

			return res.status(500).json({result: false, msg: 'Product stock must be greater than 0'})
		}
        

        logger.error(err)
        res.status(500).json({ result: false, msg: 'create product error' })

        return
    }
	})
    }

    // -------------------------------------------------------------------------------------------------------------------
	// update Product
	// -------------------------------------------------------------------------------------------------------------------

    updateProduct = async (req: express.Request, res: express.Response) => {
		form.parse(req, async (err, fields, files) => {
            
            const productId = Number(req.params.id)

			try {
                
				
                const productInfos = (await this.productService.productInfo(productId)).product[0]
				

                let oldName = productInfos.name
                let oldPrice = productInfos.price
                let oldImage = productInfos.image
                let oldDescription = productInfos.description
                let oldStatus_id = productInfos.status_id
                let oldStock = productInfos.stock

				
				const newName = fields.newName != null && !Array.isArray(fields.newName)
                ? fields.newName 
				: oldName

                const newPrice = fields.newPrice != null && !Array.isArray(fields.newPrice)
                ? Number(fields.newPrice) 
				: oldPrice


                const newImage =files.newImage != null && !Array.isArray(files.newImage)
                ? files.newImage.newFilename
				: oldImage

                const newDescription = fields.newDescription != null && !Array.isArray(fields.newDescription)
                ? String(fields.newDescription)
				: oldDescription

                const newStatus_id = fields.newStatus_id != null && !Array.isArray(fields.newStatus_id)
                ? Number(fields.newStatus_id) 
				: oldStatus_id

                const newStock = fields.newStock != null && !Array.isArray(fields.newStock)
                ? Number(fields.newStock) 
				: oldStock

				const productInfo = await this.productService.updateProduct(
                    productId,
                    newName,
                    newPrice,
					newImage,
                    newDescription,
                    newStatus_id,
                    newStock
				)
				return res.json({
					result: true,
					msg: 'Update Product Information success',
					productInfo
				})
			} catch (err) {
				logger.error(err)
				return res.json({
					result: false,
					msg: 'Update Product Information fail'
				})
			}
		})
	}
	// -------------------------------------------------------------------------------------------------------------------
	// create promotion detail 🤗
	// -------------------------------------------------------------------------------------------------------------------

	createPromotion = async (req: express.Request, res: express.Response) => {
		try {
			const promotion = req.body.promotion
			const productName = req.body.productname
			const productNumber = req.body.productnumber
			const freebieName = req.body.freebiename
			const freebieNumber = req.body.freebienumber

			
			const productId = (await this.productService.productIdByName(productName)).rows[0].id

			console.log(productId)
			console.log(promotion)
			

			const freebieId = (await this.productService.productIdByName(freebieName)).rows[0].id
			

			const promotionRecord = (await this.productService.createPromotion(promotion))[0].id

			console.log(promotionRecord)


			const promotionDetails = await this.productService.createPromotionDetails(promotionRecord, productId, productNumber, freebieId, freebieNumber)

			return res.json({
				result: true,
				msg: 'Create promotion success',
				promotionRecord,
				promotionDetails
			})
		} catch (err) {
			logger.error(err)
			return res.json({ result: false, msg: 'Create promotion fail' })
		}
	
}

	// -------------------------------------------------------------------------------------------------------------------
	// search productIdByName
	// -------------------------------------------------------------------------------------------------------------------
	searchProductIdByName = async (req: express.Request, res: express.Response,) => {
		try {
			const keyword = String(req.query.keyword)
			console.log(keyword)
			const productId = await this.productService.searchProductIdByName(keyword)

			// console.log(productId)
			return res.json({
				result: true,
				msg: 'Search Product Id by Name success',
				productId
			})
		} catch (err) {
			logger.error(err)
			return res.json({ result: false, msg: 'Search Product ID by Name Fail' })
		}
	}

	// -------------------------------------------------------------------------------------------------------------------
	// get productIdByName
	// -------------------------------------------------------------------------------------------------------------------
	productIdByName = async (req: express.Request, res: express.Response,) => {
		try {
			const product = String(req.query.product)

			const productId = await this.productService.productIdByName(product)

			// console.log(productId)
			return res.json({
				result: true,
				msg: 'Get Product Id by Name success',
				productId
			})
		} catch (err) {
			logger.error(err)
			return res.json({ result: false, msg: 'Get Product ID by Name Fail' })
		}
	}
}

