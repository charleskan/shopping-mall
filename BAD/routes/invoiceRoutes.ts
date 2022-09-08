import express from 'express'
import { InvoiceController } from '../controllers/invoiceController'

export function createInvoiceRoutes(invoiceController: InvoiceController) {
  const invoiceRoutes = express.Router()

	invoiceRoutes.get('/invoice', invoiceController.getInvoiceDetailByUserId)//session['invoice'].id
	// invoiceRoutes.post('/invoice', invoiceController.createInvoice)
	// invoiceRoutes.put('/invoice/:id', invoiceController.updateInvoice)
	invoiceRoutes.patch('/invoice/:id', invoiceController.deleteInvoice)


	invoiceRoutes.post('/cart/:id', invoiceController.addProductToCart)
	invoiceRoutes.delete('/cart/:id', invoiceController.deleteProductFromCart)
	// invoiceRoutes.put('/cart/:id', invoiceController.updateProductInCart)
	// invoiceRoutes.get('/cart/:id', invoiceController.getProductInCart)
	invoiceRoutes.get('/cart', invoiceController.getAllProductInCart)
	invoiceRoutes.get('/freebie', invoiceController.checkFreebieInCart)
	invoiceRoutes.get('/totalPrice', invoiceController.getTotalPrice)
	invoiceRoutes.delete('/minusProductInCart/:id', invoiceController.minusProductInCart)

	// invoiceRoutes.get('/invoiceLargestNumber', invoiceController.getInvoiceLargestNumber)









	return invoiceRoutes;
}