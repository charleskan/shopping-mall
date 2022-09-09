import { Knex } from "knex"
import { Invoice } from '../models'
import { Invoice_product } from '../models'

export class InsertRejectError extends Error {
    constructor(msg?: string) {
        super(msg)
        Object.setPrototypeOf(this, InsertRejectError.prototype)
    }
}

export class InvoiceService {
    constructor(private knex: Knex) { }

    // -------------------------------------------------------------------------------------------------------------------
    // get Invoice Info by userId
    // -------------------------------------------------------------------------------------------------------------------
    async getInvoiceDetailByUserId(userId: number) {


        let invoiceRecord = this.knex<Invoice>('invoice')
            .select('*')
            .where('user_id', userId)
            .andWhere('status_id', 1)


        return invoiceRecord

    }

    // -------------------------------------------------------------------------------------------------------------------
    // get the next invoice number
    // -------------------------------------------------------------------------------------------------------------------
    // async getInvoiceLargestNumber() {


    //     const isolationLevel = "serializable";
    //     const trx = await this.knex.transaction({ isolationLevel })


    //     try {
    //         const invoiceLargestNumber = await trx
    //         .select('invoiceNumber', 'id')
    //         .from('invoice')
    //         .orderBy('invoiceNumber', 'desc')
    //         .limit(1)
    //         .returning('invoiceNumber')

    //         const invoiceLargestNumberString = invoiceLargestNumber[0].invoiceNumber//expect 'ABC003'
    //         const invoiceLargestNumberNumber = Number(invoiceLargestNumberString.substring(3, invoiceLargestNumberString.length))//3
    //         const invoiceLargestNumberNextNumber = invoiceLargestNumberNumber + 1 //4
    //         const invoiceLargestNumberNextString = 'ABC00' + invoiceLargestNumberNextNumber.toString() //'ABC004'

    //         await trx.commit()
    //         return invoiceLargestNumberNextString

    //     } catch (error) {
    //         await trx.rollback()
    //         await fail()
    //         throw new GetInvoiceLargestNumberError()

    //     }

    // }

    // -------------------------------------------------------------------------------------------------------------------
    // create invoice
    // -------------------------------------------------------------------------------------------------------------------
    async createInvoice(
       
        status_id: number = 1, // always 1
        user_id: number,
        address_id: number,
        
    ) {
        const isolationLevel = 'serializable';
        const trx = await this.knex.transaction({ isolationLevel });
        try {
            //get the next invoice number
            const invoiceLargestNumber = await trx
                .select('invoiceNumber', 'id')
                .from('invoice')
                .orderBy('invoiceNumber', 'desc')
                .limit(1)
                .returning('invoiceNumber')

            const invoiceLargestNumberString = invoiceLargestNumber[0].invoiceNumber//expect 'ABC003'
            const invoiceLargestNumberNumber = Number(
                invoiceLargestNumberString
                    .substring(3, invoiceLargestNumberString.length))//3
            const invoiceLargestNumberNextNumber = invoiceLargestNumberNumber + 100 //4
            const invoiceLargestNumberNextString = 'ABC00' + invoiceLargestNumberNextNumber.toString() //'ABC004'

            //insert
            const invoiceRecord = await trx
                .insert({
                    invoiceNumber: invoiceLargestNumberNextString,
                    status_id: status_id,
                    user_id: user_id,
                    address_id: address_id,
                    totalPrice: 0
                })
                .from('invoice')
                .returning('*')

            await trx.commit()

            return invoiceRecord

        } catch (error) {
            await trx.rollback()
            throw new InsertRejectError()
        }
    }




    // -------------------------------------------------------------------------------------------------------------------
    // update invoice
    // -------------------------------------------------------------------------------------------------------------------
    async updateInvoice(id: number, invoiceNumber: string, status_id: number, user_id: number, address_id: number, totalPrice: number) {

        {


            let invoiceRecord = this.knex<Invoice>('invoice')

                .update({
                    invoiceNumber: invoiceNumber,
                    status_id: status_id,
                    user_id: user_id,
                    address_id: address_id,
                    totalPrice: totalPrice
                })
                .where('id', id)
                .returning('*')

            return invoiceRecord
        }

    }
    // -------------------------------------------------------------------------------------------------------------------
    // delete Invoice
    // -------------------------------------------------------------------------------------------------------------------

    async deleteInvoice(id: number) {

        {

            let invoiceRecord = this.knex<Invoice>('invoice')


                .update({
                    status_id: 3
                })
                .where('id', id)
                .returning('*')


            return invoiceRecord
        }

    }

    // -------------------------------------------------------------------------------------------------------------------
    // add product to cart 
    // -------------------------------------------------------------------------------------------------------------------

    async addProductToCart(
        invoice_id: number,
        product_id: number,
        number: number,
        price: number,

    ) {

        {

            //insert
            let productToCartRecord = await this.knex<Invoice_product>('invoice_product')

                .insert({
                    invoice_id: invoice_id,
                    product_id: product_id,
                    number: number,
                    price: price
                })
                .returning('*')

            return productToCartRecord

        }

    }
    // -------------------------------------------------------------------------------------------------------------------
    // get all product in cart 
    // -------------------------------------------------------------------------------------------------------------------

    async getAllProductInCart(invoiceId: number) {

        {

            const productInCartRecord = await this.knex
                .raw
                (

                    `
                    WITH suckSQL as
                    (
                    select *
                    FROM invoice_product
                    where invoice_id = ?
                    ),
                    
                    productInCartDetail as 
                    (
                    select sum(price) as sum_of_Price, 
                    product_id,
                    invoice_id,
                    sum(number) as sum_of_Number
                    from suckSQL
                    group by product_id, invoice_id
                
                    )
                    
                    
                select *
                from productInCartDetail
                inner join product 
                on product.id = productInCartDetail.product_id;
                        `,
                    [invoiceId]
                )


            return productInCartRecord
        }

    }
    // -------------------------------------------------------------------------------------------------------------------
    // delete product from cart ✅
    // -------------------------------------------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------------------------------------------
    // delete product from cart ✅
    // -------------------------------------------------------------------------------------------------------------------
    async deleteProductFromCart(invoiceId: number, deleteFromCartProductId: number) {
        {
            const deleteRecordInvoice = await this.knex('invoice_product')
                .where('product_id', deleteFromCartProductId)
                .andWhere('invoice_id', invoiceId)
                .del()
                .returning('*')

            return deleteRecordInvoice
        }
    }
    // -------------------------------------------------------------------------------------------------------------------
    // check freebie in cart
    // -------------------------------------------------------------------------------------------------------------------

    async checkFreebieInCart(invoiceId: number) {

        {
            const FreebieInCart = await this.knex
                .raw(
                    `
                WITH suckSQL as
                (
                select *
                FROM invoice_product
                where invoice_id = ?
                ),
                
                
                productInCartDetail as 
                (
                select sum(price) as sum_of_Price, 
                product_id,
                invoice_id,
                sum(number) as sum_of_Number
                from suckSQL
                group by product_id, invoice_id
                ),
                
                
                fkSQL as 
                (
                select *
                from productInCartDetail
                ),
                
                
                freebie_final as 
                (
                select * from fkSQL 
                inner join promotion_product pp 
                on fkSQL.product_id = pp.product_id
                )
                
                select invoice_id,
                (DIV(sum_of_number, product_number) * freebie_number) as 
                number_of_freebie, name, freebie_id, image 
                from freebie_final 
                inner join product p 
                on p.id = freebie_final.freebie_id
                where (DIV(sum_of_number, product_number) * freebie_number) != 0
                `,
                    [invoiceId]
                )

            return FreebieInCart;
        }
    }

    // -------------------------------------------------------------------------------------------------------------------
    // get total price from invoice_product table
    // -------------------------------------------------------------------------------------------------------------------

    async getTotalPrice(invoiceId: number) {

        {

            const getTotalPrice = await this.knex
                .raw
                (
                    `
                    WITH suckSQL as
                    (
                    select *
                    FROM invoice_product
                    where invoice_id = ?
                    ),
                    
                    productInCartDetail as 
                    (
                    select sum(price) as sum_of_Price, 
                    product_id,
                    invoice_id,
                    sum(number) as sum_of_Number
                    from suckSQL
                    group by product_id, invoice_id
                
                    )
                    
                    
                select invoice_id, SUM(sum_of_price) as total_price
                from productInCartDetail
                inner join product 
                on product.id = productInCartDetail.product_id
                group by invoice_id
                        `,
                    [invoiceId]
                )


            return getTotalPrice
        }

    }

    // -------------------------------------------------------------------------------------------------------------------
    // update number of product in cart
    // -------------------------------------------------------------------------------------------------------------------

    async minusProductInCart(invoiceId: number, minusProductInCartId: number) {
        {
            const deleteNumberProductRecord = await this.knex
                .raw
            (
            `
                with suckSQL as
			   (
               select * 
               from invoice_product
               where invoice_id = ?
               and product_id = ?
               )
               
             delete 
             from invoice_product where id=(select max(id) from suckSQL)
             returning *
            
             `,
                [invoiceId, 
                minusProductInCartId]
            )


            return deleteNumberProductRecord
        }
    }
}
