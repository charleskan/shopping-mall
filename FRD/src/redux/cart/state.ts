import { LoadingState } from "../../models";


export interface  productDetailId {
    productId: number,
    colorId: number,
    sizeId: number,
}
export interface  ProductInCart {
    id: number,
    product: string,
    icon: string,
    color: string,
    size: string,
    tc_price: number,
    tc_number: string,

}
export interface CartState {
    // product: Product,
    productDetailIds: productDetailId[],
    products:ProductInCart[],
    loading: LoadingState;

}