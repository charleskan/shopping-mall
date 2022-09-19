import axios from "axios";
import { AppDispatch, RootState } from "../../store";
import { Product } from "./state";

export function loadedProducts(products: Product[]) {
  return {
    type: '@@product/LOADED_PRODUCT' as const,
    products
  }
}

export function loadedOneProduct(product: Product) {
  return {
    type: '@@product/LOADED_ONE_PRODUCT' as const,
    product
  }
}


type LoadedProductsAction = ReturnType<typeof loadedProducts>;
type LoadedOneProductAction = ReturnType<typeof loadedOneProduct>;

export type ProductActions = LoadedProductsAction | LoadedOneProductAction

export function loadProducts() {
  return async (dispatch: AppDispatch) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/allProductInfo`)

    dispatch(loadedProducts(res.data))
  }
}

export function loadOneProduct(id: number) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // slow approach
    if (getState().product.products.find(p => p.id === id)) {
      return;
    }

    const res = await axios.get(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/productinfo/${id}`)
    console.log('res:',res)
    
    if (res.data.length > 0) {
      dispatch(loadedOneProduct(res.data[0]))
    }
  }
}