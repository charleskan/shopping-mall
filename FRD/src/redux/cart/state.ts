import { LoadingState } from "../../models";



export interface  Product{
    tc_price: string,
    productDetail_id: number,
    invoice_id: number,
    tc_number: string,
    id: number,
    product_id: number,
    color_id: number,
    size_id: number,
    price: number,
    stock: number,
    status_id: number,
    created_at: string,
    updated_at: string,
}
export interface CartState {
    products:Product[],
    loading: LoadingState;

}