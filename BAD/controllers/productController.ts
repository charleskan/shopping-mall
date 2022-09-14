import express from "express";

import { logger } from "../logger";
import { form } from "../middleware";
import {
  ProductPriceError,
  ProductStockError,
  ProductService,
} from "../services/productService";

export class ProductController {
  constructor(private productService: ProductService) {}

  // -------------------------------------------------------------------------------------------------------------------
  // get All product info
  // -------------------------------------------------------------------------------------------------------------------

  allProductInfo = async (req: express.Request, res: express.Response) => {
    try {
      const allProductInfo = await this.productService.allProductInfo();
      return res.json({
        result: true,
        msg: "Get Product ALL Information success",
        allProductInfo,
      });
    } catch (err) {
      logger.error(err);
      return res.json({
        result: false,
        msg: "Get All Product Information fail",
      });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get product info
  // -------------------------------------------------------------------------------------------------------------------

  productInfo = async (req: express.Request, res: express.Response) => {
    const productId = Number(req.params.id);
    try {
      const productInfo = await this.productService.productDetailInfo(
        productId
      );
      return res.json({
        result: true,
        msg: "Get Product Information success",
        productInfo: productInfo,
      });
    } catch (err) {
      logger.error(err);

      res
        .status(500)
        .json({ result: false, msg: "Get Product Information fail" });
      return;
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // create Product
  // -------------------------------------------------------------------------------------------------------------------

  createProduct = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const name =
          fields.name != null && !Array.isArray(fields.name)
            ? fields.name
            : err;

        const description =
          fields.description != null && !Array.isArray(fields.description)
            ? fields.description
            : err;

        const brand =
          fields.brand != null && !Array.isArray(fields.brand)
            ? fields.brand
            : err;

        let icon =
          files.image != null && !Array.isArray(files.image)
            ? files.image.newFilename
            : err;

        let image1 =
          files.image != null && !Array.isArray(files.image)
            ? files.image.newFilename
            : err;

        let image2 =
          files.image != null && !Array.isArray(files.image)
            ? files.image.newFilename
            : err;

        let image3 =
          files.image != null && !Array.isArray(files.image)
            ? files.image.newFilename
            : err;

        await this.productService.createProduct(
          name,
          brand,
          description,
          icon,
          image1,
          image2,
          image3
        );
        return res.json({ result: true, msg: "create new product success" });
      } catch (err) {
        // if (err instanceof ProductPriceError) {
        //   return res.status(500).json({
        //     result: false,
        //     msg: "Product price must be greater than 0",
        //   });
        // } else if (err instanceof ProductStockError) {
        //   return res.status(500).json({
        //     result: false,
        //     msg: "Product stock must be greater than 0",
        //   });
        // }

        logger.error(err);
        res.status(500).json({ result: false, msg: "create product error" });

        return;
      }
    });
  };

    // -------------------------------------------------------------------------------------------------------------------
  // create ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  createProductDetail = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const product_id =
          fields.product_id != null && !Array.isArray(fields.product_id)
            ? fields.product_id
            : err;

        const color_id =
          fields.color_id != null && !Array.isArray(fields.color_id)
            ? fields.color_id
            : err;

        const size_id =
          fields.name != null && !Array.isArray(fields.size_id)
            ? fields.name
            : err;

        let price =
          files.price != null && !Array.isArray(files.price)
            ? files.price
            : err;

        let stock =
          files.stock != null && !Array.isArray(files.stock)
            ? files.stock
            : err;



        await this.productService.createProductDetail(
          product_id,
          color_id,
          size_id,
          price,
          stock
        );
        return res.json({ result: true, msg: "create new product success" });
      } catch (err) {
        if (err instanceof ProductPriceError) {
          return res.status(500).json({
            result: false,
            msg: "Product price must be greater than 0",
          });
        } else if (err instanceof ProductStockError) {
          return res.status(500).json({
            result: false,
            msg: "Product stock must be greater than 0",
          });
        }

        logger.error(err);
        res.status(500).json({ result: false, msg: "create product error" });

        return;
      }
    });
  };

  // -------------------------------------------------------------------------------------------------------------------
  // update Product
  // -------------------------------------------------------------------------------------------------------------------

  updateProduct = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      const productId = Number(req.params.id);

      try {
        const productInfos = (await this.productService.productInfo(productId))[0];

        let oldName = productInfos.name;
        let oldBrand = productInfos.brand;
        let oldDescription = productInfos.description;
        let oldIcon = productInfos.icon;
        let oldImage1 = productInfos.image1;
        let oldImage2 = productInfos.image2;
        let oldImage3 = productInfos.image3;

        const newName =
          fields.newName != null && !Array.isArray(fields.newName)
            ? fields.newName
            : oldName;
			
		const newBrand =
          fields.newBrand != null && !Array.isArray(fields.newBrand)
            ? String(fields.newBrand)
            : oldBrand;

		const newDescription =
          fields.newDescription != null && !Array.isArray(fields.newDescription)
            ? String(fields.newDescription)
            : oldDescription;

        const newIcon =
          files.newIcon != null && !Array.isArray(files.newImage)
            ? files.newImage.newFilename
            : oldIcon;
			
		

        const newImage1 =
          files.newImage1 != null && !Array.isArray(files.newImage)
            ? files.newImage.newFilename
            : oldImage1;

        const newImage2 =
          files.newImage2 != null && !Array.isArray(files.newImage)
            ? files.newImage.newFilename
            : oldImage2;

        const newImage3 =
          files.newImage3 != null && !Array.isArray(files.newImage)
            ? files.newImage.newFilename
            : oldImage3;



        const productInfo = await this.productService.updateProduct(
          productId,
          newName,
		  newBrand,
		  newDescription,
		  newIcon,
          newImage1,
          newImage2,
          newImage3,
        );
        return res.json({
          result: true,
          msg: "Update Product Information success",
          productInfo,
        });
      } catch (err) {
        logger.error(err);
        return res.json({
          result: false,
          msg: "Update Product Information fail",
        });
      }
    });
  };


	// -------------------------------------------------------------------------------------------------------------------
 	 // update ProductDetail
  	// -------------------------------------------------------------------------------------------------------------------

	  updateProductDetail = async (req: express.Request, res: express.Response) => {
		form.parse(req, async (err, fields, files) => {
		  const productDetailId = Number(req.params.id);
	
		  try {
			const productInfos = (await this.productService.productDetailInfo(productDetailId))[0];
	
			let oldPrice = productInfos.price;
			let oldStock = productInfos.stock;
			let oldStatus_id = productInfos.status_id;
	
			const newPrice =
			  fields.newPrice != null && !Array.isArray(fields.newPrice)
				? Number(fields.newPrice)
				: oldPrice;
				
			const newStock =
			  fields.newStock != null && !Array.isArray(fields.newStock)
				? Number(fields.newStock)
				: oldStock;
	
			const newStatus_id =
			  fields.newStatus_id != null && !Array.isArray(fields.newStatus_id)
				? Number(fields.newStatus_id)
				: oldStatus_id;
	
	
	
			const productInfo = await this.productService.updateProductDetail(
			  productDetailId,
			  newPrice,
			  newStock,
			  newStatus_id,
			);
			return res.json({
			  result: true,
			  msg: "Update Product Information success",
			  productInfo,
			});
		  } catch (err) {
			logger.error(err);
			return res.json({
			  result: false,
			  msg: "Update Product Information fail",
			});
		  }
		});
	  };
	

  // -------------------------------------------------------------------------------------------------------------------
  // create promotion detail 🤗
  // -------------------------------------------------------------------------------------------------------------------

  createPromotion = async (req: express.Request, res: express.Response) => {
    try {
      const promotion = req.body.promotion;
      const product_id = req.body.productID;
      const product_number = req.body.productnumber;
      const freebie_id = req.body.freebieID;
      const freebie_number = req.body.freebienumber;

    //   const productId = (await this.productService.productDetailByName(productName))
    //     .rows[0].id;

    //   console.log(productId);
    //   console.log(promotion);

    //   const freebieId = (await this.productService.productDetailByName(freebieName))
    //     .rows[0].id;

      const promotion_id = (
        await this.productService.createPromotion(promotion)
      )[0].id;

      console.log(promotion_id);

      const promotionDetails = await this.productService.createPromotionDetails(
        promotion_id,
        product_id,
        product_number,
        freebie_id,
        freebie_number
      );

      return res.json({
        result: true,
        msg: "Create promotion success",
        promotion_id,
        promotionDetails,
      });
    } catch (err) {
      logger.error(err);
      return res.json({ result: false, msg: "Create promotion fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // search productIdByName
  // -------------------------------------------------------------------------------------------------------------------
  searchProductIdByName = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const keyword = String(req.query.keyword);
      const productInfos = await this.productService.productByName(
        keyword
      );

      // console.log(productId)
      return res.json({
        result: true,
        msg: "Search Product List by Name success",
        ProductList:productInfos,
      });
    } catch (err) {
      logger.error(err);
      return res.json({ result: false, msg: "Search Product List by Name Fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get productDetailByproductId
  // -------------------------------------------------------------------------------------------------------------------

  productDetailByProductId = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const product_id = Number(req.params.id);
      const productId = await this.productService.productDetailByProductId(
        product_id
      );

      // console.log(productId)
      return res.json({
        result: true,
        msg: "Search ProductDetail  by product_id success",
        productId,
      });
    } catch (err) {
      logger.error(err);
      return res.json({ result: false, msg: "Search ProductDetail  by product_id Fail" });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get productIdByName（未用到）
  // -------------------------------------------------------------------------------------------------------------------
//   productIdByName = async (req: express.Request, res: express.Response) => {
//     try {
//       const product = String(req.query.product);

//       const productId = await this.productService.productDetailByName(product);

//       // console.log(productId)
//       return res.json({
//         result: true,
//         msg: "Get Product Id by Name success",
//         productId,
//       });
//     } catch (err) {
//       logger.error(err);
//       return res.json({ result: false, msg: "Get Product ID by Name Fail" });
//     }
//   };
}
