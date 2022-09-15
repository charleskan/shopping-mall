import express from 'express'
import { ProductController } from '../controllers/productController'

export function createProductRoutes(productController: ProductController) {
    const productRoutes = express.Router()
  	productRoutes.get('/allProductInfo', productController.allProductInfo)//Tested by Ken on Sep14
	productRoutes.get('/productinfo/:id', productController.productInfo)//Tested by Ken on Sep14
	productRoutes.get('/productDetailinfo/:id', productController.productDetailInfo)//Tested by Ken on Sep14
	productRoutes.post('/Product', productController.createProduct)//Tested by Ken on Sep14
	productRoutes.post('/ProductDetail', productController.createProductDetail)//Tested by Ken on Sep14
	productRoutes.patch('/Product/:id', productController.updateProduct)//Tested by Ken on Sep14
	productRoutes.patch('/ProductDetail/:id', productController.updateProductDetail)//Tested by Ken on Sep14
	productRoutes.post('/promotion', productController.createPromotion)//Tested by Ken on Sep15
	productRoutes.post('/promotionDetail', productController.createPromotionDetail)//Tested by Ken on Sep14
	productRoutes.post('/searchProductIdByName', productController.searchProductIdByName)//Tested by Ken on Sep14
	productRoutes.get('/productDetailByproductId/:id', productController.productDetailByProductId)//Tested by Ken on Sep14

	return productRoutes;
}
