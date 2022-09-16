import express from 'express'
import { InvoiceController } from '../controllers/invoiceController'
import {userMiddleware} from '../middleware'

export function createInvoiceRoutes(invoiceController: InvoiceController) {
  const invoiceRoutes = express.Router()

	invoiceRoutes.get('/invoice', userMiddleware, invoiceController.getInvoiceDetailByUserId)//session['invoice'].id
	// invoiceRoutes.post('/invoice', invoiceController.createInvoice)
	// invoiceRoutes.put('/invoice/:id', invoiceController.updateInvoice)
	invoiceRoutes.patch('/invoice/:id', invoiceController.deleteInvoice)


	invoiceRoutes.post('/cart/:id', userMiddleware, invoiceController.addProductToCart)
	invoiceRoutes.delete('/cart/:id', invoiceController.deleteProductFromCart)
	// invoiceRoutes.put('/cart/:id', invoiceController.updateProductInCart)
	// invoiceRoutes.get('/cart/:id', invoiceController.getProductInCart)
	invoiceRoutes.get('/cart', userMiddleware, invoiceController.getAllProductInCart)
	invoiceRoutes.get('/freebie', invoiceController.checkFreebieInCart)
	invoiceRoutes.get('/totalPrice', invoiceController.getTotalPrice)
	invoiceRoutes.delete('/minusProductInCart/:id', invoiceController.minusProductInCart)

	// invoiceRoutes.get('/invoiceLargestNumber', invoiceController.getInvoiceLargestNumber)









	return invoiceRoutes;
}