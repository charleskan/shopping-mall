import { LoadingState } from "../../models";


export interface  productDetailId {
    productId: number,
}
export interface  ProductInCart {
    id: number,
    product: string,
    icon: string,
    color: string,
    size: string,
    number: number,
    product_price: number,
    tc_price: number | string,
    tc_number: number | string,

}
export interface CartState {
    // product: Product,
    productDetailIds: productDetailId[],
    products:ProductInCart[],
    loading: LoadingState;
    // savedCartItems: ProductInCart


}