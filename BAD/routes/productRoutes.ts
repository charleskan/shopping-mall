import express from 'express'
import { ProductController } from '../controllers/productController'

export function createProductRoutes(productController: ProductController) {
  const productRoutes = express.Router()
  	productRoutes.get('/allProductInfo', productController.allProductInfo)
	productRoutes.get('/productinfo/:id', productController.productInfo)
	productRoutes.post('/createProduct', productController.createProduct)
	productRoutes.patch('/updateProduct/:id', productController.updateProduct)
	productRoutes.post('/promotion', productController.createPromotion)
	productRoutes.get('/productIdByName', productController.productIdByName)
	productRoutes.get('/searchProductIdByName', productController.searchProductIdByName)

	return productRoutes;
}
