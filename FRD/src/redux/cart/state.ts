import { LoadingState } from "../../models";


export interface  Product {
    product: string,
    color: string,
    size: string,
    price: number,
    number: string,
}
export interface  ProductInCart {
    product: string,
    icon: string,
    color: string,
    size: string,
    tc_price: number,
    tc_number: string,

}
export interface CartState {
    products:ProductInCart[],
    loading: LoadingState;

}