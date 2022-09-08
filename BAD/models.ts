export interface User {
	id: number
	username: string
	password: string
    email: string
	icon: string
	nickname: string
	status_id: number
	role_id: number
}

export interface Product {
	id: number
	name: string
	price: number
	image: string
	description: string
	status_id: number
	stock: number
}

export interface Invoice {
	id: number
	invoiceNumber: string
	status_id: number
	user_id: number
	address_id: number
	totalPrice: number
}

export interface Invoice_product {
	id: number
	invoice_id: number
	product_id: number
	number: number
	price: number
}

