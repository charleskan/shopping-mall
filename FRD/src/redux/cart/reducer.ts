import produce from "immer";
import { LoadingState } from "../../models";
import { CartActions } from "./action";
import { CartState } from "./state";


const initialState: CartState = {
  products: [],
  loading: LoadingState.NotLoaded,

}

export function cartReducer(state: CartState = initialState, action: CartActions): CartState {
  switch (action.type) {
    case '@@cart/LOADED_CART':
      return {
        ...state,
        products: action.products,
        loading: LoadingState.Loaded,
      }
    case '@@cart/ADD_TO_CART':
      return {
        ...state,
        products: [...state.products, 
          {
            id: action.productId,
            product: '',
            icon: '',
            color: '',
            size: '',
            number: 1,
            product_price: 0,
            tc_price: 0,
            tc_number: 0,
          }
        ],
      };
    case '@@cart/MINUS_FROM_CART':
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.productId) {
            return {
              ...product,
              number: product.number - 1,
            };
          }
          return product;
        }),
      };
      
    case '@@cart/REMOVE_FROM_CART':
      return produce(state, state => {
        state.products = []
      }
      );
  }
  return state;
}