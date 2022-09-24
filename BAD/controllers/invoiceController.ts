import express from 'express'
// import { form } from '../middleware'
import { logger } from '../logger'
import { InvoiceService } from '../services/invoiceService'
// import { ProductService } from '../services/productService'
import { ProfileService } from '../services/profileService'
import { stripe } from '../middleware'
import { Address, Status } from '../models'


export class InvoiceController {
    constructor(
        private profileService: ProfileService,
        private invoiceService: InvoiceService,
    ) { }

    // -------------------------------------------------------------------------------------------------------------------
    // get Invoice Detail By User Id
    // -------------------------------------------------------------------------------------------------------------------
    getInvoiceDetailByUserId = async (req: express.Request, res: express.Response) => {
        try {
            const userId = req.user!.userId
            const statusId = Status.Active

            const invoiceRecord = await this.invoiceService.getInvoiceDetailByUserId(userId, statusId)

            return res.json({
                result: true,
                msg: 'Get invoice detail success',
                invoiceRecord
            })
        } catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'Get invoice detail fail' })
        }
    }
    // -------------------------------------------------------------------------------------------------------------------
    // create Invoice DEAD CODE
    // -------------------------------------------------------------------------------------------------------------------

    createInvoice = async (req: express.Request, res: express.Response) => {
        try {
            const status_id = Status.Unpaid

            const userId = req.user!.userId

            const addressId = (await this.profileService.userInfo(userId)).address[0].newAddress_id

            const invoiceRecord = await this.invoiceService.createInvoice(status_id, userId, addressId)

            console.log('invoice: ', invoiceRecord)
            

            return res.json({
                result: true,
                msg: 'Create invoice success',
                invoiceRecord
            })
        }
        catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'Create invoice fail' })
        }
    }
    // -------------------------------------------------------------------------------------------------------------------
    // Update Invoice
    // -------------------------------------------------------------------------------------------------------------------

    updateInvoice = async (req: express.Request, res: express.Response) => {


        try {
            //May be use transaction to hold the product quantity
            const userId = req.user!.userId
            const invoiceId = req.user!.invoiceId

            // console.log("invoiceId: ", invoiceId);
            // console.log("userId: ", userId);


            //@@PUT change put later
            const getTotalPrice = (await this.invoiceService.getTotalPrice
                (
                    invoiceId
                ))
            const totalPrice = getTotalPrice[0].total_price
            console.log("totalPrice: ", totalPrice);



            const invoice = await this.invoiceService.updateInvoice(
                invoiceId, Status.Paid, userId, Address.Default, totalPrice)

                console.log("invoice: ", invoice);

            const newInvoice = await this.invoiceService.createInvoice(Status.Unpaid, userId, Address.Default)

            req.user = {
                userId: userId,
                invoiceId: newInvoice[0].id,
            }
            //Add webhook later

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: 'price_1LlWXMEgzwMQrXMkIqdORghZ', //Create dynamic price later, May be use DB to store price
                        quantity: 1
                    }
                ],
                metadata: {
                    id: invoiceId
                },
                mode: 'payment',
                success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/orderCompleted`,
                cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}`
            })

            console.log("session: ", session);
            

            if (session.url != null) {
                // res.redirect(303, session.url)
                res.status(401).json(session)
            } else {
                res.redirect('/')
            }

        }
        catch (err) {
            logger.error(err)
            res.json({ result: false, msg: 'Update invoice fail' })
        }

    }


    // -------------------------------------------------------------------------------------------------------------------
    // delete Invoice
    // -------------------------------------------------------------------------------------------------------------------

    deleteInvoice = async (req: express.Request, res: express.Response) => {
        try {
            const InactivateInvoiceId = req.user!.invoiceId
            const productId = req.body.productId
            await this.invoiceService.deleteProductFromCart(InactivateInvoiceId, productId)

            return res.json({
                result: true,
                msg: 'delete product from cart success'
            })

        } catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'delete product from cart fail' })
        }

    }

    // -------------------------------------------------------------------------------------------------------------------
    // Add product to cart✅
    // -------------------------------------------------------------------------------------------------------------------

    addProductToCart = async (req: express.Request, res: express.Response) => {

        try {
            const productDetailId = parseInt(req.params.id)
            //create invoice if not exist
            const invoiceId = req.user!.invoiceId
            console.log("invoiceId: ", invoiceId);
            

            // //create invoice if user has no invoice
            // if (invoice == null) {
            //     invoice = await this.invoiceService.createInvoice(1, userId, addressId)
            // }

            // const invoiceId = invoice[0].id

            console.log('productId: ', productDetailId)
            // console.log('colorId: ',colorId)
            // console.log('sizeId: ',sizeId)
            const productQuantity = 1

            const productDetail = (await this.invoiceService.getSingleProductDetail
                (
                    productDetailId

                ))
            // console.log('productDetail: ', productDetail)

            const productRecord = await this.invoiceService.addProductToCart(
                invoiceId,
                productDetail.id,
                productQuantity,
                productDetail.price,
            )

            return res.status(200).json({
                result: true,
                msg: 'Add to cart success',
                productRecord,
            })
        }
        catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'Add to cart fail' })
        }
    }

    // -------------------------------------------------------------------------------------------------------------------
    // get product in cart
    // -------------------------------------------------------------------------------------------------------------------

    getAllProductInCart = async (req: express.Request, res: express.Response) => {
        try {
            const invoiceId = req.user!.invoiceId
            const productRecord = await this.invoiceService.getAllProductInCart(invoiceId, Status.Unpaid)

            return res.json({
                result: true,
                msg: 'Get product list success',
                productRecord
            })
        }
        catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'Get product list fail' })
        }
    }

    // -------------------------------------------------------------------------------------------------------------------
    // get freebie information
    // -------------------------------------------------------------------------------------------------------------------

    checkFreebieInCart = async (req: express.Request, res: express.Response) => {

        try {
            const invoiceId = req.user!.invoiceId
            const freebieDetails = await this.invoiceService.checkFreebieInCart(invoiceId)

            return res.json({
                result: true,
                freebieDetails,
                msg: 'Get freebie success'
            })
        } catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'Get freebie fail' })
        }

    }
    // -------------------------------------------------------------------------------------------------------------------
    // get total price
    // -------------------------------------------------------------------------------------------------------------------

    getTotalPrice = async (req: express.Request, res: express.Response) => {

        try {
            const invoiceId = req.user!.invoiceId
            const getTotalPrice = await this.invoiceService.getTotalPrice(invoiceId)

            return res.json({
                result: true,
                getTotalPrice,
                msg: 'Get total price success'
            })
        } catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'Get total price success' })
        }

    }

    // -------------------------------------------------------------------------------------------------------------------
    // Find the next invoice number (ask tutor, is it needed?)
    // -------------------------------------------------------------------------------------------------------------------

    // getInvoiceLargestNumber = async (req: express.Request, res: express.Response) => {

    //     try {
    //         const invoiceNumber = await this.invoiceService.getInvoiceLargestNumber()
    //         return res.json({
    //             result: true,
    //             msg: 'Get invoice largest number success',
    //             invoiceNumber
    //         })
    //     }
    //     catch (err) {
    //         logger.error(err)
    //         return res.json({ result: false, msg: 'Get invoice largest number fail' })
    //     }
    // }

    // -------------------------------------------------------------------------------------------------------------------
    // minusProductInCart
    // -------------------------------------------------------------------------------------------------------------------

    minusProductInCart = async (req: express.Request, res: express.Response) => {
        try {
            const minusProductId = parseInt(req.params.id)
            const invoiceId = req.user!.invoiceId

            await this.invoiceService.minusProductInCart(invoiceId, minusProductId)

            return res.json({
                result: true,
                msg: 'minus product in cart success'
            })
        } catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'minus product in cart fail' })
        }

    }

    // -------------------------------------------------------------------------------------------------------------------
    // delete product from cart✅
    // -------------------------------------------------------------------------------------------------------------------

    deleteProductFromCart = async (req: express.Request, res: express.Response) => {
        try {
            const deleteFromCartProductId = parseInt(req.params.id)
            const invoiceId = req.user!.invoiceId

            await this.invoiceService.deleteProductFromCart(invoiceId, deleteFromCartProductId)

            return res.json({
                result: true,
                msg: 'delete product from cart success'
            })
        } catch (err) {
            logger.error(err)
            return res.json({ result: false, msg: 'delete product from cart fail' })
        }

    }

}
