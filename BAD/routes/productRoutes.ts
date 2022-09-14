import express from 'express'
import { ProductController } from '../controllers/productController'

export function createProductRoutes(productController: ProductController) {
  const productRoutes = express.Router()
  	productRoutes.get('/allProductInfo', productController.allProductInfo)//Tested by Ken on Sep14
	productRoutes.get('/productinfo/:id', productController.productInfo)//Tested by Ken on Sep14
	productRoutes.post('/Product', productController.createProduct)//Tested by Ken on Sep14
	productRoutes.post('/ProductDetail', productController.createProductDetail)
	productRoutes.patch('/Product/:id', productController.updateProduct)
	productRoutes.patch('/ProductDetail/:id', productController.updateProductDetail)
	productRoutes.post('/promotion', productController.createPromotion)
	productRoutes.post('/searchProductIdByName', productController.searchProductIdByName)//Tested by Ken on Sep14
	productRoutes.get('/productDetailByproductId/:id', productController.productDetailByProductId)//Tested by Ken on Sep14

	return productRoutes;
}
