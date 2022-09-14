import express from 'express'
import { ProductController } from '../controllers/productController'

export function createProductRoutes(productController: ProductController) {
  const productRoutes = express.Router()
  	productRoutes.get('/allProductInfo', productController.allProductInfo)
	productRoutes.get('/productinfo/:id', productController.productInfo)
	productRoutes.post('/Product', productController.createProduct)
	productRoutes.post('/ProductDetail', productController.createProductDetail)
	productRoutes.patch('/Product/:id', productController.updateProduct)
	productRoutes.patch('/ProductDetail/:id', productController.updateProductDetail)
	productRoutes.post('/promotion', productController.createPromotion)
	productRoutes.get('/searchProductIdByName', productController.searchProductIdByName)
	productRoutes.get('/productDetailByproductId', productController.productDetailByProductId)

	return productRoutes;
}
