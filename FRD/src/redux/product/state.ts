import { LoadingState } from "../../models";

export interface Product {
  id: number;
  name: string;
  price: string;
}

export interface ProductState {
  loading: LoadingState; 
  
  products: Product[];

}