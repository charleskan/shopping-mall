export interface Product{
    name: string;
    price: number;
}

export interface ProductsState {

    products: Product[];

    // productList: number[];
    // product: {
    //     [id: number]: Product;
    // }
}