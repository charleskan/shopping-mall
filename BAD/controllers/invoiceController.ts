import express from 'express'
// import { form } from '../middleware'
import { logger } from '../logger'
import { InvoiceService } from '../services/invoiceService'
// import { ProductService } from '../services/productService'
import { ProfileService } from '../services/profileService'


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
            const statusId = 1

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
            let status_id = 1

            const userId = req.user!.userId

            const addressId = (await this.profileService.userInfo(userId)).address[0].newAddress_id

            const invoiceRecord = await this.invoiceService.createInvoice(status_id, userId, addressId)

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

    // updateInvoice = async (req: express.Request, res: express.Response) => {
    //     form.parse(req, async (err, fields) => {

    //         const invoiceId = req.session['invoice'].id

    //         const userId = req.session['user']

    //         try {
    //             const invoiceInfos = await this.invoiceService.getInvoiceDetailByUserId(userId)



    //             let oldInvoiceNumber = invoiceInfos[0].invoiceNumber
    //             let oldStatus_id = invoiceInfos[0].status_id
    //             let oldUser_id = invoiceInfos[0].user_id
    //             let oldAdress_id = invoiceInfos[0].address_id
    //             let oldTotalPrice = invoiceInfos[0].totalPrice


    // const newInvoiceNumber = fields.invoiceNumber != null && !Array.isArray(fields.name)
    //     ? fields.invoiceNumber : oldInvoiceNumber

    // const newStatus_id = fields.status_id != null && !Array.isArray(fields.status_id)
    //     ? Number(fields.status_id) : oldStatus_id

    // const newUser_id = fields.user_id != null && !Array.isArray(fields.user_id)
    //     ? Number(fields.user_id) : oldUser_id

    // const newAddress_id = fields.adress_id != null && !Array.isArray(fields.adress_id)
    //     ? Number(fields.address_id) : oldAdress_id

    // const newTotalPrice = fields.totalPrice != null && !Array.isArray(fields.totalPrice)
    //     ? Number(fields.totalPrice) : oldTotalPrice


    // const invoiceRecord = await this.invoiceService.updateInvoice(
    //     invoiceId,
    //     newInvoiceNumber,
    //     newStatus_id,
    //     newUser_id,
    //     newAddress_id,
    //     newTotalPrice)

    //             return res.json({
    //                 result: true,
    //                 msg: 'Update invoice success',
    //                 invoiceRecord
    //             })
    //         }
    //         catch (err) {
    //             logger.error(err)
    //             return res.json({ result: false, msg: 'Update invoice fail' })
    //         }
    //     })
    // }


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
            const productId = parseInt(req.params.id)
            const colorId = req.body.colorId
            const sizeId = req.body.sizeId
            //create invoice if not exist
            const invoiceId = req.user!.invoiceId

            // //create invoice if user has no invoice
            // if (invoice == null) {
            //     invoice = await this.invoiceService.createInvoice(1, userId, addressId)
            // }

            // const invoiceId = invoice[0].id

            // console.log(productId)
            const productQuantity = 1

            const productDetail = (await this.invoiceService.getSingleProductDetail
                (
                    productId,
                    colorId,
                    sizeId,

                ))
            // console.log(productPrice)

            const productRecord = await this.invoiceService.addProductToCart(
                invoiceId,
                productDetail.id,
                productQuantity,
                productDetail.price,
            )

            return res.json({
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
            const productRecord = await this.invoiceService.getAllProductInCart(invoiceId)

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
