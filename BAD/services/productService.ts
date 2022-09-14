import { Knex } from "knex";
import { Product, ProductDetail } from "../models";

export class ProductPriceError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductPriceError.prototype);
  }
}

export class ProductStockError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductStockError.prototype);
  }
}

export class ProductNameError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductNameError.prototype);
  }
}

export class ProductService {
  constructor(private knex: Knex) {}

  // -------------------------------------------------------------------------------------------------------------------
  // Get All Product Info
  // -------------------------------------------------------------------------------------------------------------------

  async allProductInfo() {
    {
      const productInfo = await this.knex<Product>("product").select("*");
      // `SELECT * FROM product INNER JOIN product_color pc ON
      // product.id = pc.product_id`

      return productInfo;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Get individual Product Info
  // -------------------------------------------------------------------------------------------------------------------

  async productInfo(productId: number) {
    //console.log(this.tableName)
    {
      const productInfo = await this.knex("product")
        .select("*")
        .where("id", productId); //.andWhere( "status_id", 1)

      return { productInfo };
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // Get individual ProductDetail Info
  // -------------------------------------------------------------------------------------------------------------------

  async productDetailInfo(productId: number) {
    //console.log(this.tableName)
    {
      const productDetailInfo = await this.knex("productDetail")
        .select("*")
        .where("Product_id", productId); //.andWhere( "status_id", 1)

      // const productColorInfo = await this.knex
      // .raw(
      // 	/*sql */
      // 	`select * from color
      // 	where id in (
      // 	select color_id from product_color where product_id = ?)`,[productId])

      // const productSizeInfo = await this.knex
      // .raw(
      // 	/*sql */
      // 	`select * from size
      // 	where id in (
      // 	select size_id from product_size where product_id = ?)`,[productId])

      return { productDetailInfo };
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Create New Product
  // -------------------------------------------------------------------------------------------------------------------

  async createProduct(
    name: string,
    brand: string,
    description: string,
    icon: string,
    image1: string,
    image2: string,
    image3: string
  ) {
    // insert new product

    {
      if (!name) {
        throw new ProductNameError();
      } else {
        const newProductRecord = await this.knex<Product>("product")
          .insert({
            name: name,
            brand: brand,
            description: description,
            icon: icon,
            image1: image1,
            image2: image2,
            image3: image3,
          })
          .returning("*");

        return newProductRecord;
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Create New ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async createProductDetail(
    product_id: number,
    color_id: number,
    size_id: number,
    price: number,
    stock: number
  ) {
    // insert new product

    {
      if (price < 0) {
        throw new ProductPriceError();
      }

      if (stock < 0) {
        throw new ProductStockError();
      } else {
        const newProductDetailRecord = await this.knex<ProductDetail>(
          "productDetail"
        )
          .insert({
            product_id: product_id,
            color_id: color_id,
            size_id: size_id,
            price: price,
            stock: stock,
          })
          .returning("*");

        return newProductDetailRecord;
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Update Product
  // -------------------------------------------------------------------------------------------------------------------

  async updateProduct(
    productId: number,
    newName: string,
    newBrand: string,
    newDescription: string,
    newIcon: string,
    newImage1: string,
    newImage2: string,
    newImage3: string
  ) {
    {
      if (!newName) {
        throw new ProductNameError();
      }

      const productRecord = await this.knex<Product>("product")

        .update({
          name: newName,
          brand: newBrand,
          description: newDescription,
          icon: newIcon,
          image1: newImage1,
          image2: newImage2,
          image3: newImage3,
        })

        .where("id", productId)
        .returning("*");

      return productRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Update ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async updateProductDetail(
    productDetailId: number,
    newPrice: number,
    newStock: number,
    newStatus_id: number
  ) {
    {
      {
        if (newPrice < 0) {
          throw new ProductPriceError();
        }

        if (newStock < 0) {
          throw new ProductStockError();
        }

        const productDetailRecord = await this.knex<ProductDetail>(
          "productDetail"
        )

          .update({
            price: newPrice,
            stock: newStock,
            status_id: newStatus_id,
          })

          .where("id", productDetailId)
          .returning("*");

        return productDetailRecord;
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Delete All ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async deleteAllProductDetail(productId: number) {
    {
      const productDetailRecord = await this.knex<ProductDetail>(
        "productDetail"
      )
        .update("status_id", 2)
        .where("product_id", productId)
        .returning("*");

      return productDetailRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Delete ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async deleteProductDetail(productDetailId: number) {
    {
      const productDetailRecord = await this.knex<ProductDetail>(
        "productDetail"
      )
        .update("status_id", 2)
        .where("id", productDetailId)
        .returning("*");

      return productDetailRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // create promotion
  // -------------------------------------------------------------------------------------------------------------------
  async createPromotion(promotion: string) {
    {
      const promotionRecord = await this.knex("promotion")
        .insert({
			name: promotion,
        	status_id: 1,
          
        })
        .returning("*");

      return promotionRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // create promotion details (promotion_product)
  // -------------------------------------------------------------------------------------------------------------------

  async createPromotionDetails(
    promotion_id: number,
    product_id: number,
    product_number: number,
    freebie_id: number,
    freebie_number: number
  ) {
    {
      const promotionDetails = await this.knex("promotion_product")
        .insert({
          promotion_id: promotion_id,
          product_id: product_id,
          product_number: product_number,
          freebie_id: freebie_id,
          freebie_number: freebie_number,
          freebie_price: 0,
        })
        .returning("*");

      return promotionDetails;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // search productByName
  // -------------------------------------------------------------------------------------------------------------------

  async productByName(keyword: string) {
    {
      const productInfo = await this.knex.raw(
        /*sql */
        `SELECT id FROM product WHERE name ILIKE ? order by updated_at desc`,
        ["%" + keyword + "%"]
      );

    //   const productDetail = await this.knex.raw(
    //     /*sql */
    //     `
	// 	SELECT * 
	// 	FROM productDetail 
	// 	WHERE product_id = ? 
	// 	AND status_id = 1
	// 	`,
    //     [productId]
    //   );

      return productInfo;
    }
  }


  // -------------------------------------------------------------------------------------------------------------------
  // search productDetailByProductId
  // -------------------------------------------------------------------------------------------------------------------

  async productDetailByProductId(productId: number) {
    {
    //   const productInfo = await this.knex.raw(
    //     /*sql */
    //     `SELECT id FROM product WHERE name ILIKE ? order by updated_at desc`,
    //     ["%" +  + "%"]
    //   );

      const productDetailInfo = await this.knex.raw(
        /*sql */
        `
		SELECT * 
		FROM productDetail 
		WHERE product_id = ? 
		AND status_id = 1
		`,
        [productId]
      );

      return productDetailInfo;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get productIdByName (唔知有咩用🤔)
  // -------------------------------------------------------------------------------------------------------------------

//   async productIdByName(name: string) {
//     {
//       const productId = await this.knex.raw(
// 		/*sql */
//         `

// 				SELECT * FROM product WHERE name = ?
// 			`,
//         [name]
//       );

//       return productId;
//     }
//   }
 }
