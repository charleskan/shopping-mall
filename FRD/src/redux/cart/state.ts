import { LoadingState } from "../../models";



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